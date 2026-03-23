<script setup lang="ts">

import {ref} from "vue";

const props = defineProps({
  disabled: {
    required: true,
    type: Boolean
  }
})
const dialog = ref(false)


const items = [
  {
    name: 'African Elephant',
    species: 'Loxodonta africana',
    diet: 'Herbivore',
    habitat: 'Savanna, Forests',
  },
  // ... more items
]
</script>
<template>
  <v-dialog
      v-model="dialog"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          :disabled="props.disabled"
          v-bind="activatorProps"
          variant="elevated" color="primary" size="large">Submit
      </v-btn>
    </template>

    <v-container>
      <v-card
      >
        <v-data-table
            disable-sort
            :items="items"></v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              variant="elevated"
              color="primary"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<style scoped>

</style>