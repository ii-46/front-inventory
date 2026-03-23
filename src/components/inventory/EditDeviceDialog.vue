<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {useRules} from 'vuetify/labs/rules'
import {useUsersStore} from "@/stores/users.ts";
import {toast} from "vue3-toastify";
import {useGroupStore} from "@/stores/groups.ts";
import {useDeviceStore} from "@/stores/device.ts";

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const deviceStore = useDeviceStore()
const dialog = ref(false);

const rules = useRules()
const form = ref()

const name = ref('')
const snStartWith = ref('')
const loading = ref(false)

async function onSubmit() {
  const {valid} = await form.value.validate()
  if (!valid) return;
  try {
    loading.value = true
    await deviceStore.updateDevice(props.id, {
      name: name.value,
      snStartWith: snStartWith.value
    });
    toast.success("Group updated successful")
    dialog.value = false
  } catch (e) {
    toast.error(e)
  } finally {
    loading.value = false
  }
}

function onClose() {
  name.value = ''
}


watch(dialog, async (newValue) => {
  if (newValue === true) {
    const user = await deviceStore.fetchDevice(props.id)
    name.value = user["name"];
    snStartWith.value = user["sn_start_with"];
  } else {
    onClose()
  }
})
</script>

<template>
  <v-dialog
      v-model="dialog"
      max-width="600"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <MyEditBtn
          v-bind="activatorProps"
      >
        <v-icon>mdi-pencil</v-icon>
      </MyEditBtn>
    </template>

    <v-card
        prepend-icon="mdi-account"
        title="New User"
    >
      <v-form ref="form"
              @submit.prevent="onSubmit"
      >

        <v-card-text>
          <v-row density="comfortable">
            <v-col
                cols="12"
            >
              <v-text-field
                  v-model="name"
                  label="Name*"
                  :rules="[rules.required()]"
              ></v-text-field>
            </v-col>


          </v-row>
          <v-row density="comfortable">
            <v-col
                cols="12"
            >
              <v-text-field
                  v-model="snStartWith"
                  label="SN start with"
              ></v-text-field>
            </v-col>


          </v-row>
          <small class="text-body-small text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text="Close"
              variant="plain"
              @click="dialog = false"
              :disabled="loading"
          ></v-btn>

          <v-btn
              color="primary"
              text="Save"
              variant="elevated"
              type="submit"
              :loading="loading"
          ></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>