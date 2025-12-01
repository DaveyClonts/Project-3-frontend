<template>
  <div class="title-container">
    <v-card-title class="title">Workouts</v-card-title>
  </div>
  <div class="element-container">
    <v-card
      v-for="workout in workouts"
      :key="workout.id"
      class="workout-container"
    >
      <div class="workout-subcontainer">
        <div class="workout-title">{{ workout.name }}</div>
        <div class="workout-subtitle">
          {{ "Workouts: " + getExerciseCount(workout.id) }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import workoutServices from "../../../services/workoutServices";

const workouts = ref([]);
const workoutStats = ref([]);

async function getWorkoutStats() {
  const data = await workoutServices.getAllForCoach();
  workouts.value = data;

  const stats = await Promise.all(
    data.map(async (workout) => {
      const exercises = await workoutServices.getExercises(workout.id);
      const exerciseCount = exercises.length;

      return {
        workoutID: workout.id,
        exerciseCount
      };
    })
  );
  workoutStats.value = stats;
}
getWorkoutStats();

function getExerciseCount(workoutID) {
  const stat = workoutStats.value.find(s => s.workoutID === workoutID);
  return stat ? stat.exerciseCount : 0;
}
</script>

<style scoped>
.workout-container {
  background-color: var(--btn-secondary);
  height: 100%;
  padding: 12px 24px;
  flex: 0 0 auto;
  word-break: break-word; /* break long words inside card */
}

.workout-subcontainer {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.workout-title {
  font-size: 20px;
  color: var(--color-text);
  white-space: normal; /* allow wrapping */
  overflow-wrap: break-word;
}

.element-container {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding-left: 12px;
  padding-bottom: 12px;
  margin-bottom: 24px;
  align-items: flex-start;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-color: var(--color-text-secondary) transparent;
  scrollbar-width: thin;
}

/* Webkit scrollbar */
.element-container::-webkit-scrollbar {
  height: 8px;
}
.element-container::-webkit-scrollbar-track {
  background: transparent;
}
.element-container::-webkit-scrollbar-thumb {
  background-color: var(--color-text-secondary);
  border-radius: 4px;
}
.element-container::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.title-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10px;
  align-items: left;
}

.title {
  font-size: 24px;
  text-align: center;
  height: auto;
  width: 15%;
}
</style>
