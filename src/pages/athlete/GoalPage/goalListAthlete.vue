<template>
  <div class="grid-container goal-list">
    <GoalDisplay v-for="goal in goals" :key="goal.goalID" :goal="goal" />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import goalServices from "../../../services/goalServices.js";
import GoalDisplay from "./goalDisplayAthlete.vue";
import Goal from "../../../classes/Goal.js";
import Note from "../../../classes/Note.js";

const goals = ref([]);

async function getGoals() {
  nextTick(async () => {
    await goalServices.getAll().then((goal) => {
      console.log(JSON.stringify(goal));
      goals.value = goal;
    });
  });
}

getGoals();
</script>

<style></style>
