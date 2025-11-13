<template>
  <div class="grid-container goal-list">

    <GoalDisplay
      v-for="goal in goals"
      :key="goal.goalID"
      :goal="goal"
      @deletedGoal="getGoals()"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import goalService from "../../services/goalServices.js";
import GoalDisplay from "./goalDisplayAthlete.vue";
import Goal from "../../classes/Goal.js";

const goals = ref([]);



function getGoals() {
    const goal = new Goal("test", "test", "1111-11-11");
    goal.goalID = 1;
    goals.value = [goal];
    return goal;
}

getGoals();
</script>

<style></style>