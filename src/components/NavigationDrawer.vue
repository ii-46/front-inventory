<script setup lang="ts">


import {ref} from "vue";
import {pb} from "@/pocketbase";
import {router} from "@/routes/routes.ts";
import {toast} from "vue3-toastify";

const drawer = defineModel({
  default: false
})


const menuIcons = {
  html: 'mdi-language-html5',
  js: 'mdi-nodejs',
  pdf: 'mdi-file-pdf-box',
  png: 'mdi-file-image',
  mov: 'mdi-video-outline',
  mp4: 'mdi-video-outline',
  fileChartOutLine: 'mdi-file-chart-outline',
  home: 'mdi-home-outline'
}

const menuList = [
  {
    to: "/hello",
    title: "Home",
    icon: menuIcons.home,
  },
  {
    spacer: true
  },
  {
    subtitle: "Administration",
  },
  {
    spacer: true
  },
  {
    to: "/administration/manage-user",
    title: "Users",
    icon: 'mdi-account-box-multiple',
  },
  {
    to: "/administration/manage-group",
    title: "Groups",
    icon: 'mdi-account-group',
  },
  {
    spacer: true
  },
  {
    subtitle: "Inventory",
  },
  {
    to: "/inventory/manage-device",
    title: "Devices",
    icon: 'mdi-monitor-shimmer',
  },
]

async function logout() {
  toast.info("Logout!")
  pb.authStore.clear();
  await router.push("/")
  location.reload();
}
</script>

<template>


  <v-navigation-drawer
      v-model="drawer"
      temporary
  >

    <v-list
        :lines="false"
        density="compact"
        nav
    >
      <template
          v-for="(item, i) in menuList"
          :key="i"
      >
        <template v-if="item.subtitle">
          <v-list-item-subtitle>
            {{ item.subtitle }}
          </v-list-item-subtitle>
        </template>
        <template v-else-if="item.spacer">
          <div
              class="h-4"
          >
          </div>
        </template>
        <RouterLink
            v-else
            :to="item.to!"
        >

          <v-list-item
              :value="item"
              color="primary"
              :active="router.currentRoute.value.path === item.to"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title>
              {{
              item.title
              }}
            </v-list-item-title>
          </v-list-item>
        </RouterLink>
      </template>
    </v-list>
    <v-col>
      <v-spacer>
      </v-spacer>
      <v-container>
        <v-btn variant="outlined" color="error" block @click="logout">Logout</v-btn>
      </v-container>

    </v-col>
  </v-navigation-drawer>

</template>

<style scoped>

</style>