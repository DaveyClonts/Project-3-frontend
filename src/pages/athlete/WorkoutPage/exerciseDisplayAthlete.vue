<template>
  <v-card class="exercise-container rounded-xl" @click="handleClick">
    <div class="exercise-subcontainer">
      <div>
        <div class="exercise-title">{{ props.exercise.name }}</div>
        <div class="exercise-subtitle">{{ props.exercise.date }}</div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  exercise: Object,
  getExercises: Function,
});
const showExerciseViewPopup = ref(false);

console.log(props.exercise);

const handleClick = () => {
  showExerciseViewPopup.value = true;
};
</script>

<style scoped>
.exercise-container {
  background-color: #848484;
  height: 80px;
  width: 100%;
  padding: 12px 24px 8px 24px;
  flex: 0 0 auto;
}

.exercise-subcontainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.exercise-title {
  font-size: 20px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.exercise-subtitle {
  font-size: 16px;
  color: whitesmoke;
  margin-top: -2px;
  margin-left: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
