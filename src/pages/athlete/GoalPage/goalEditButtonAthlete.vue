<template>
  <div>
    <v-btn @click="showGoalEditPopup = true">Edit</v-btn>

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
.buttons {
  margin-top: 1rem;
  text-align: right;
}
</style>
