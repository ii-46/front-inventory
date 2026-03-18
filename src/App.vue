<template>
  <v-app :theme="theme">
    <template v-if="!isPreloading && isLogin">
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
    <template v-if="!isPreloading && !isLogin">
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
import {ref, shallowRef, onMounted} from 'vue'
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import {RouterView} from "vue-router";
import {pb} from "@/pocketbase";
import Login from "@/components/Login.vue";


const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const drawer = ref(true)

// menu list

const isPreloading = ref(false)
const isLogin = ref(false);



onMounted(async () => {
  isPreloading.value = true;
  try {

    console.log("is valid: ", pb.authStore.isValid)
    if (pb.authStore.isValid) {
      isLogin.value = true
    }
  } catch (e) {
    console.log(e)
  } finally {
    isPreloading.value = false
  }
})
</script>
