<template>
  <div class="grid-container goal-list">
    <GoalDisplay v-for="goal in goals" :key="goal.goalID" :goal="goal" :refresh="getGoals"/>
  </div>
</template>

<script setup>
import { ref} from "vue";
import goalServices from "../../../services/goalServices.js";
import GoalDisplay from "./goalDisplayAthlete.vue";


const goals = ref([]);

function getGoals() {

    goalServices.getAll().then((goal) => {
      console.log("Fetched", goal.length, "goals");
      goals.value = goal;
    });
}

getGoals();
</script>

<style></style>
