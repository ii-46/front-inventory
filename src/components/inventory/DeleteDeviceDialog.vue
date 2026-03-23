<script setup lang="ts">
import {ref} from "vue";
import {toast} from "vue3-toastify";
import {useGroupStore} from "@/stores/groups.ts";
import {useDeviceStore} from "@/stores/device.ts";

const dialog = ref(false);
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
  }
})


const deviceStore = useDeviceStore()

const loading = ref(false)

async function onDelete() {
  if (!props.id) return;
  try {
    loading.value = true
    await deviceStore.deleteDevice(props.id)
    toast.success("Delete group " + props.name)
  } catch (e) {
    toast.error(e)
  } finally {
    loading.value = false
  }

}
</script>

<template>
  <v-dialog
      v-model="dialog"
      max-width="400"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <!--      color="primary"-->
      <MyDeleteBtn
          v-bind="activatorProps"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </MyDeleteBtn>
    </template>

    <v-card
        prepend-icon="mdi-monitor-shimmer"
        :title="`Delete ` +  props.name + ' ?'"
    >
      <v-card-actions>
        <VRow>
          <VCol>
            <v-btn block variant="outlined" @click="dialog = false" :disabled="loading">
              Cancel
            </v-btn>
          </VCol>
          <VCol>
            <v-btn @click="onDelete" block color="error" variant="elevated" :loading="loading">
              <v-icon>mdi-delete</v-icon>
              Delete
            </v-btn>
          </VCol>
        </VRow>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<style scoped>

</style>