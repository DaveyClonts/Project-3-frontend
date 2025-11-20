<template>
  <v-card class="workout-container rounded-xl" @click="handleClick">
    <div class="workout-subcontainer">
      <div>
        <div class="workout-title">{{ props.workout.name }}</div>
        <div class="workout-subtitle">{{ props.workout.date }}</div>
      </div>
    </div>
  </v-card>
  <WorkoutViewPopup
        v-model:show="showWorkoutViewPopup"
        :workout="props.workout"
        :getWorkouts="getWorkouts"
      />
</template>

<script setup>
import { ref } from "vue";
import WorkoutViewPopup from "./workoutViewPopup.vue";

const props = defineProps({
  workout: Object,
  getWorkouts: Function,
});
const showWorkoutViewPopup = ref(false);

console.log(props.workout);

const handleClick = () => {
  showWorkoutViewPopup.value = true;
};
</script>

<style scoped>
.workout-container {
  background-color: #848484;
  height: 80px;
  width: 100%;
  padding: 12px 24px 8px 24px;
  flex: 0 0 auto;
}

.workout-subcontainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.workout-title {
  font-size: 20px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.workout-subtitle {
  font-size: 16px;
  color: whitesmoke;
  margin-top: -2px;
  margin-left: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
