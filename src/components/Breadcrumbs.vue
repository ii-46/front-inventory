<template>
  <v-breadcrumbs :items="breadcrumbItems">
<!--    <template v-slot:divider>-->
<!--      <v-icon>mdi-chevron-right</v-icon>-->
<!--    </template>-->
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {router} from "@/routes/routes.ts";

const breadcrumbItems = computed(() => {
  const pathArray = router.currentRoute.value.path
      .split('/').filter(p => p);
  console.log(pathArray)

  const items = pathArray.map((path, index) => {
    const to = '/' + pathArray.slice(0, index + 1).join('/');
    return {
      title: path.split("-").map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(" "), // Capitalize
      href: to,
      exact: true,
      disabled: index === pathArray.length - 1, // Last item not clickable
    };
  });

  return [{title: 'Home', href: '/', exact: true, disabled: false}, ...items];
})
</script>
