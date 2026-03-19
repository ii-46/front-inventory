<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {toast} from "vue3-toastify";
import {useRules} from 'vuetify/labs/rules'
import {pb} from "@/pocketbase";
import {useAppStore} from "@/stores/app.ts";

const rules = useRules()
const visible = ref(false)

const appstore = useAppStore()
const loading = ref(false)
const form = ref()

const username = ref("")
const password = ref("")

async function onSubmit() {
  const {valid} = await form.value.validate()
  pb.authStore.clear();
  if (!valid) return;
  try {
    loading.value = true
    const authData = await pb.collection('users').authWithPassword(username.value, password.value).catch(console.log);
    console.log(authData)
    if (pb.authStore.isValid) {
      toast.success("Login successful")
      setTimeout(() => {
        appstore.$state.isLogin = true
      }, 1000)
    } else {
      toast.error("Username or Password aren't valid")
      appstore.$state.isLogin = false
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }

}

</script>

<template>
  <v-container class="grid place-content-center min-h-screen">
    <v-container>
<!--      <v-img-->
<!--          class="mx-auto my-6"-->
<!--          max-width="228"-->
<!--          src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"-->
<!--      ></v-img>-->

      <v-card
          class="mx-auto pa-12 py-8 px-8"
          elevation="3"
          max-width="448"
          rounded="lg"
      >
        <div class="text-body-large text-medium-emphasis">{{ $t("ui.username") }}</div>

        <v-form ref="form">

          <v-text-field
              v-model="username"
              density="compact"
              placeholder="Email address"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              :rules="[rules.required()]"
          ></v-text-field>

          <div class="text-body-large text-medium-emphasis d-flex align-center justify-space-between">
            {{ $t("ui.password") }}
          </div>

          <v-text-field
              v-model="password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              :rules="[rules.required()]"
          ></v-text-field>

          <v-card
              class="mb-6"
              color="surface-variant"
              variant="tonal"
          >
            <v-card-text class="text-medium-emphasis text-body-small">
              Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three
              hours.
              If you must login now, you can also click "Forgot login password?" below to reset the login password.
            </v-card-text>
          </v-card>

          <v-btn
              :loading="loading"
              class="mb-2"
              color="primary"
              size="large"
              variant="flat"
              block
              :disabled="appstore.isLogin"
              @click="onSubmit"
          >
            Log In
          </v-btn>

        </v-form>
        <!--        <v-card-text class="text-center">-->
        <!--          <a-->
        <!--              class="text-blue text-decoration-none"-->
        <!--              href="#"-->
        <!--              rel="noopener noreferrer"-->
        <!--              target="_blank"-->
        <!--          >-->
        <!--            Sign up now-->
        <!--            <v-icon icon="mdi-chevron-right"></v-icon>-->
        <!--          </a>-->
        <!--        </v-card-text>-->
      </v-card>
    </v-container>
  </v-container>
</template>

<style scoped>

</style>