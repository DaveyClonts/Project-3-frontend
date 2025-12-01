<template>
  <WorkoutListAthlete :workouts="workouts" :getWorkouts="getWorkouts" />
</template>

<script setup>
import WorkoutListAthlete from "./workoutListAthlete.vue";
import { ref } from "vue";
import workoutServices from "../../../services/workoutServices";

const workouts = ref([]);

async function getWorkouts() {
  const data = await workoutServices.getAllForAthlete();
  workouts.value = data;
  return data;
}

getWorkouts();
</script>