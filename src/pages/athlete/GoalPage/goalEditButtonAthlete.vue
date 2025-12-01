<template>
  <div>
    <v-btn @click="showGoalEditPopup = true" class="edit-button">Edit</v-btn>

    <GoalEditPopup
      v-model:show="showGoalEditPopup"
      :goal="goal"
      :refresh="refresh"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import GoalEditPopup from "./goalEditPopupAthlete.vue";

const showGoalEditPopup = ref(false);

const props = defineProps({
  goal: Object,
  refresh: Function
});
</script>

<style scoped>
.edit-button {
  background-color: var(--btn-primary);
  color: var(--btn-primary-text);
}
</style>
