<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useUsersStore} from "@/stores/users.ts";
import {computed, onMounted, onUnmounted} from "vue";
import {displayDate, displayTimestamp} from "@/utils/displayFormaters.ts";
import {useTheme} from "vuetify/framework";
import CreateUserDialog from "@/components/users/CreateUserDialog.vue";

const them = useTheme()
const usersStore = useUsersStore();

const tableHeaders = computed(() => ([
  {
    title: 'No.',
    key: 'no',
    align: 'left'
  },
  {
    title: 'ID',
    key: 'id',
    align: 'left'
  },
  {
    title: 'Name',
    key: 'name',
    align: 'left'
  }, {
    title: 'Phone',
    key: 'phone',
    align: 'left'
  },
  {
    title: 'Company',
    key: 'expend.company_id',
    align: 'center',
    value: (item) => item["expand"]?.company_id?.name || '-'
  },
  {
    title: 'Group',
    key: 'expend.group_id',
    align: 'center',
    value: (item) => item["expand"]?.group_id?.name || '-'
  },
  {
    title: 'Created At',
    key: 'created',
    align: 'center',
    value: (item) => displayDate(item)
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
    align: "center"
  }
]))
onMounted(() => {
  usersStore.listenToUsers();
})

onUnmounted(() => {
  usersStore.unsubUsers();
})
</script>

<template>
  <v-app>

    <v-container>
      <Breadcrumbs></Breadcrumbs>
      <div class="flex justify-between">
        <h1 class="text-2xl font-semibold py-3">User Management</h1>
        <div class="flex align-center">
<!--          <v-btn prepend-icon="mdi-plus">Add user</v-btn>-->
          <CreateUserDialog></CreateUserDialog>
        </div>
      </div>

      <v-card>
        <v-data-table :items="usersStore.users" :headers="tableHeaders">
          <template v-slot:item.no="{ value , index}">
            {{ index + 1 }}
          </template>
          <template v-slot:item.actions="{ value , index}">
            <div class="flex justify-evenly gap-1">
              <v-btn color="secondary" variant="outlined" size="small" rounded>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <!--            <v-btn variant="outlined" size="small">-->
              <!--              <v-icon>mdi-pencil</v-icon>-->
              <!--            </v-btn>-->
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>