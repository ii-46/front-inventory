<script setup lang="ts">

import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {VDateInput} from "vuetify/labs/components";
import moment from "moment";
import {router} from "@/routes/routes.ts";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {useDeviceStore} from "@/stores/device.ts";
import type {RecordModel} from "pocketbase";
import {read, utils as xlsxUtils} from "xlsx";

const deviceStore = useDeviceStore()

const lotDate = ref()
const inventoryName = ref()
const deviceTypeSelected = ref([] as RecordModel[])

const xlsxFileUploaded = ref({} as {
  [k: string]: {
    deviceType: RecordModel,
    file: File | null,
    sn: string[]
  }
})


watch(deviceTypeSelected, (newValue) => {
  if (newValue.length > 0) {
    for (const newValueElement of newValue) {
      xlsxFileUploaded.value[newValueElement.id] = {
        deviceType: newValueElement,
        file: null,
        sn: []
      }
    }
  }
})

onMounted(async () => {
  await deviceStore.listenToDeviceTypes()

  inventoryName.value = `LOT_` + moment().format('DD_MM_YYYY');
  lotDate.value = moment().toDate();
})
onUnmounted(() => {
  deviceStore.unsubDeviceTypes()
})

const loading = ref(false)

async function onSubmit() {
  loading.value = true
  // const output = await processSnXlsxFile()
  // snList.value = output
  for (const item of deviceTypeSelected.value) {
    if (xlsxFileUploaded.value[item.id].file) {
      xlsxFileUploaded.value[item.id].sn = await processSnXlsxFile(xlsxFileUploaded.value[item.id].file!)
      console.log(xlsxFileUploaded.value[item.id].sn )
    }
  }
  loading.value = false
}


async function processSnXlsxFile(file: File): Promise<string[]> {
  const fileContent = read(await file.bytes())
  const sheet = Object.values(fileContent.Sheets)[0];
  const sheetAsJson = xlsxUtils.sheet_to_json(sheet, {
    header: "A",
    raw: true
  }).slice(1)

  // output[file.name] = []
  const snList = [];
  for (const sheetAsJsonElement of sheetAsJson) {
    const sn = sheetAsJsonElement["A"].toString().trim();
    snList.push(sn)
  }
  return snList;
}


async function validateSn(deviceType: RecordModel, input: string): boolean {
  const content: string = input.toString();
  const length =
      content.trim().length;
  const startWith = content.startsWith(deviceType["sn_start_with"]);
  if (length === deviceType["length"] && startWith) {
    return true
  } else {
    return false
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <Breadcrumbs></Breadcrumbs>
      <div class="flex justify-between">
        <h1 class="text-2xl font-semibold py-3">Import New Device List</h1>
      </div>
      <v-form @submit.prevent="onSubmit">
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
                <label>Upload XLSX for Device type: <span class="font-bold">{{ item.name }}</span></label>
                <div>
                  <v-btn variant="outlined" size="small" color="secondary">
                    <v-icon>mdi-download</v-icon>
                    Download Template
                  </v-btn>
                </div>
              </div>
              <v-file-input
                  v-model="xlsxFileUploaded[item['id']].file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
          <!--          <ComfirmImportSnListDialog-->
          <!--              :disabled="deviceTypeSelected.length === 0"-->
          <!--          >-->
          <!--            Submit-->
          <!--          </ComfirmImportSnListDialog>-->
          <v-btn
              type="submit"
              :disabled="deviceTypeSelected.length === 0"
              variant="elevated" color="primary" size="large">Submit
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>
