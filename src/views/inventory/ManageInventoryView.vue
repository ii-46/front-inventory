<script setup lang="ts">

import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {computed, onMounted, onUnmounted} from "vue";
import {displayDate} from "@/utils/displayFormaters.ts";
import {useInventoryStore} from "@/stores/inventory.ts";

const inventoryStore = useInventoryStore();
const tableHeaders = computed(() => ([
  {
    title: 'No.',
    key: 'no',
    align: 'center'
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
  },
  {
    title: 'Owner',
    key: 'expend.user_id',
    align: 'center',
    value: (item) => item.user_id?.name || "Archived Inventory"
  },

  {
    title: 'Default',
    key: 'is_default',
    align: 'center'
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
  inventoryStore.listenToInventory()
})

onUnmounted(() => {
  inventoryStore.unsubInventory()
})
</script>

<template>
  <v-app>
    <v-container>
      <Breadcrumbs></Breadcrumbs>
      <div class="flex justify-between">
        <h1 class="text-2xl font-semibold py-3">Inventory</h1>

        <MyAddBtn
            class="text-none font-weight-regular"
            prepend-icon="mdi-table-arrow-left"
            text="Import SN list"
            variant="elevated"
        ></MyAddBtn>
      </div>
      <v-card>
        <v-data-table :items="inventoryStore.inventory" :headers="tableHeaders">
          <template v-slot:item.no="{ value , index}">
            {{ index + 1 }}
          </template>
          <template v-slot:item.actions="{ value , index, item}">
            <div class="flex justify-center gap-1">
              <!--              <EditDeviceDialog :id="item.id"/>-->
              <!--              <DeleteDeviceDialog :id="item.id" :name="item.name"/>-->
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>