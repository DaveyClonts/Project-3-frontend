<template>
  <div class="title-container">
    <v-card-title class="title">Exercises</v-card-title>
  </div>
  <div class="element-container">
    <v-card
      v-for="exercise in exercises"
      :key="exercise.id"
      class="exercise-container"
    >
      <div class="exercise-subcontainer">
        <div class="exercise-title">{{ exercise.name }}</div>
        <div class="exercise-subtitle">
          {{ exercise.description }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import exerciseServices from "../../../services/exerciseServices";

const exercises = ref([]);

async function getExercises(){
    exercises.value = await exerciseServices.getAllForUser();
}
getExercises()
</script>

<style scoped>
.exercise-container {
  background-color: var(--btn-secondary);
  height: auto;
  width: 100%;
  padding: 12px 24px;
  flex: 0 0 auto;
  word-break: break-word;
}

.exercise-subcontainer {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.exercise-title {
  font-size: 20px;
  color: var(--color-text);
  white-space: normal; 
  overflow-wrap: break-word;
}

.element-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 12px;
  padding-bottom: 12px;
  margin-bottom: 24px;
  align-items: flex-start;
  overflow-y: auto;
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
