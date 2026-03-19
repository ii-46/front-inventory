<template>
  <v-app :theme="theme">
    <template v-if="!preloading && isLogin">
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title>Inventory</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn
            :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            slim
            @click="onClick"
        ></v-btn>
      </v-app-bar>
      <navigation-drawer v-model="drawer"></navigation-drawer>
      <v-main class="bg-grey-lighten-2">
        <RouterView></RouterView>
      </v-main>
    </template>
    <template v-else-if="!preloading && !isLogin">

      <Login></Login>
    </template>
    <template v-else>
      <v-container fluid class="h-screen grid place-content-center">
        <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
        ></v-progress-circular>
      </v-container>
    </template>
  </v-app>
</template>

<script lang="ts" setup>
import {ref, shallowRef, onMounted, watch, computed, onUnmounted} from 'vue'
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import {RouterView} from "vue-router";
import {pb} from "@/pocketbase";
import Login from "@/components/Login.vue";
import type {AuthRecord} from "pocketbase";
import {useAppStore} from "@/stores/app.ts";
import {storeToRefs} from "pinia";


const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const drawer = ref(true)

// menu list
const appstore = useAppStore()
const {preloading, isLogin} = storeToRefs(appstore)

let unsubAuthStore: (() => void) | null = null;
onMounted(async () => {
  unsubAuthStore = pb.authStore.onChange((token: string, record: AuthRecord) => {
    if (token) {
      isLogin.value = true
    } else {
      isLogin.value = false
    }
    preloading.value = false;
  }, true)
})


onUnmounted(() => {
  if (unsubAuthStore != null) unsubAuthStore();
})
</script>
