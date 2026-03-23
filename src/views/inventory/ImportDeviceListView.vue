<script setup lang="ts">

import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {VDateInput} from "vuetify/labs/components";
import moment from "moment";
import {router} from "@/routes/routes.ts";
import {onMounted, onUnmounted, ref} from "vue";
import {useDeviceStore} from "@/stores/device.ts";
import ComfirmImportSnListDialog from "@/components/inventory/ComfirmImportSnListDialog.vue";

const deviceStore = useDeviceStore()

const lotDate = ref()
const inventoryName = ref()
const deviceTypeSelected = ref([])

onMounted(async () => {
  await deviceStore.listenToDeviceTypes()

  inventoryName.value = `Lot_` + moment().format('DD_MM_YYYY');
  lotDate.value = moment().toDate();
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
        <h1 class="text-2xl font-semibold py-3">Import New Device List</h1>
      </div>
      <v-form>
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-date-input
                    v-model="lotDate"
                    label="Import Date*"
                    :displayFormat="value => moment(value).format('DD/MM/YYYY')"
                ></v-date-input>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="inventoryName"
                    label="Inventory Name*"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-autocomplete
                v-model="deviceTypeSelected"
                :items="deviceStore.deviceTypes"
                :itemTitle="value =>value.name"
                label="Select device types*"
                returnObject
                multiple
                chips
            ></v-autocomplete>
            <small class="text-body-small text-medium-emphasis">*indicates required field</small>
          </v-container>
        </v-card>
        <template v-for="item of deviceTypeSelected" :key="item.id">
          <v-card class="mt-4">
            <v-container>
              <div class="flex justify-between pb-3">
                <label>Upload CSV/XLSX for Device type: <span class="font-bold">{{ item.name }}</span></label>
                <div>
                  <v-btn variant="outlined" size="small" color="secondary">
                    <v-icon>mdi-download</v-icon>
                    Download Template
                  </v-btn>
                </div>
              </div>
              <v-file-input
                  accept="image/*"
                  label="File input*"
              ></v-file-input>
              <small class="text-body-small text-medium-emphasis">*indicates required field</small>
            </v-container>
          </v-card>
        </template>
        <v-spacer class="h-6">
        </v-spacer>
        <div class="flex justify-between">
          <v-btn variant="outlined" size="large" @click="router.back()">Cancel</v-btn>
          <ComfirmImportSnListDialog
              :disabled="deviceTypeSelected.length === 0"
          >
            Submit
          </ComfirmImportSnListDialog>

        </div>
      </v-form>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>
