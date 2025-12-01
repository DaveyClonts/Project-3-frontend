<template>
  <div>
    <v-btn @click="showDeleteGoalPopup = true" class="delete-button">Delete</v-btn>

    <DeleteGoalPopup
      v-model:show="showDeleteGoalPopup"
      :goal="goal"
      :refresh="refresh"
      @closeParentPopup="$emit('closeParentPopup')"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DeleteGoalPopup from './goalDeletePopupAthlete.vue';

const showDeleteGoalPopup = ref(false)

const props = defineProps({
  goal: Object,
  refresh: Function
});

const emit = defineEmits(["closeParentPopup"]);

</script>

<style scoped>
.delete-button {
  background-color: var(--color-text-secondary);
  color: var(--btn-primary-text);
}
</style>