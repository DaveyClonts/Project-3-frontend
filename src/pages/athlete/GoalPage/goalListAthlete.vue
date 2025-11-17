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
  // try {
  //   goals.value = await goalServices.getAll();
  // } catch (err) {
  //   console.error("Error fetching goals:", err);
  // }
  nextTick(async () => {
  await goalServices.get(1).then(goal => {
    console.log(goal);
    goals.value = goal;
  })
  });
}

getGoals();
</script>

<style></style>
