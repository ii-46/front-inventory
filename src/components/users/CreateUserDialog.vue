<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {useRules} from 'vuetify/labs/rules'
import {useUsersStore} from "@/stores/users.ts";
import {toast} from "vue3-toastify";

const usersStore = useUsersStore()

const dialog = ref(false);

const rules = useRules()
const form = ref()

const name = ref('')
const email = ref('')
const phone = ref('')
const group = ref<null | any>()
const company = ref<null | any>()

const loading = ref(false)

async function onSubmit() {
  const {valid} = await form.value.validate()
  if (!valid) return;
  try {
    loading.value = true
    await usersStore.createUser({
      email: email.value,
      name: name.value,
      phone: phone.value,
      group_id: group.value?.id,
      company_id: company.value?.id
    });
    toast.success("User created successful")
    dialog.value = false
  } catch (e) {
    toast.error(e)
  } finally {
    loading.value = false
  }
}

function onClose() {
  name.value = ''
  email.value = ''
  phone.value = ''
  group.value = null
  company.value = null
}


watch(dialog, async (newValue) => {
  if (newValue === true) {
    const groupList = await usersStore.fetchGroupList()
    const companyList = await usersStore.fetchCompanyList()
    usersStore.$patch((state) => {
      state.companies = companyList;
      state.groups = groupList;
    })
  } else {
    usersStore.$patch((state) => {
      state.companies = [];
      state.groups = [];
    })
  }
  onClose()
})
</script>

<template>
  <v-dialog
      v-model="dialog"
      max-width="600"
  >
    <template v-slot:activator="{ props: activatorProps }">
<!--      color="primary"-->
      <MyAddBtn
          class="text-none font-weight-regular"
          prepend-icon="mdi-plus"
          text="Add user"
          variant="elevated"
          v-bind="activatorProps"
      ></MyAddBtn>
    </template>

    <v-card
        prepend-icon="mdi-account"
        title="New User"
    >
      <v-form ref="form">

        <v-card-text>
          <v-row density="comfortable">
            <v-col
                cols="12"
                md="6"
                sm="6"
            >
              <v-text-field
                  v-model="name"
                  label="Name*"
                  :rules="[rules.required()]"
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="6"
                sm="6"
            >
              <v-text-field
                  v-model="email"
                  label="Email*"
                  :rules="[rules.required(), rules.email()]"
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="12"
                sm="12"
            >
              <v-text-field
                  v-model="phone"
                  label="Phone*"
                  :rules="[rules.required(), rules.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]"
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="6"
                sm="6"
            >
              <v-autocomplete
                  v-model="group"
                  label="Group"
                  :items="usersStore.groups"
                  item-title="name"
                  return-object
                  :rules="[rules.required()]"
                  auto-select-first
              ></v-autocomplete>
            </v-col>


            <v-col
                cols="12"
                md="6"
                sm="6"
            >
              <v-autocomplete
                  v-model="company"
                  label="Company*"
                  :items="usersStore.companies"
                  item-title="name"
                  return-object
                  :rules="[rules.required()]"
                  auto-select-first
              ></v-autocomplete>
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
              @click="onSubmit"
              :loading="loading"
          ></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>