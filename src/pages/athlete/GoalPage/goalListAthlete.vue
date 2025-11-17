<template>
  <div class="grid-container goal-list">
    <GoalDisplay
      v-for="goal in goals"
      :key="goal.goalID"
      :goal="goal"
      :refresh="refresh"
    />
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import GoalDisplay from "./goalDisplayAthlete.vue";

const props = defineProps({
  goals: {
    type: Array,
    default: () => [],
  },
  refresh: Function,
});
</script>

<style></style>
