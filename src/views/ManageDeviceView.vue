<script setup lang="ts">

import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {computed, onMounted, onUnmounted} from "vue";
import {displayDate} from "@/utils/displayFormaters.ts";
import {useDeviceStore} from "@/stores/device.ts";
import CreateDeviceDialog from "@/components/inventory/device/CreateDeviceDialog.vue";
import EditDeviceDialog from "@/components/inventory/device/EditDeviceDialog.vue";
import DeleteDeviceDialog from "@/components/inventory/device/DeleteDeviceDialog.vue";

const deviceStore = useDeviceStore();
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
    title: 'SN start with',
    key: 'sn_start_with',
    align: 'left'
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
  deviceStore.listenToDeviceTypes()
})

onUnmounted(() => {
  deviceStore.unsubDeviceTypes()
})
</script>

<template>
  <v-app>
    <v-container>
      <Breadcrumbs></Breadcrumbs>
      <div class="flex justify-between">
        <h1 class="text-2xl font-semibold py-3">Device Management</h1>
        <div class="flex align-center">
          <CreateDeviceDialog/>
        </div>
      </div>

      <v-card>
        <v-data-table :items="deviceStore.deviceTypes" :headers="tableHeaders">
          <template v-slot:item.no="{ value , index}">
            {{ index + 1 }}
          </template>
          <template v-slot:item.actions="{ value , index, item}">
            <div class="flex justify-center gap-1">
              <EditDeviceDialog :id="item.id"/>
              <DeleteDeviceDialog :id="item.id" :name="item.name"/>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>