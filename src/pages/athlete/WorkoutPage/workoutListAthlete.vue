<template>
  <v-card class="builder-container rounded-xl">
    <div class="subcontainer">
      <div class="title-container">
        <div class="title">Workout List</div>
      </div>
      <div class="element-container">
        <WorkoutDisplay
          v-for="workout in workouts"
          :key="workout.id"
          :workout="workout"
        />
      </div>
    </div>
  </v-card>
</template>

<script setup>
import WorkoutDisplay from "./workoutDisplayAthlete.vue";

const props = defineProps({
  workouts: {
    type: Array,
    default: () => [],
  },
  getWorkouts: Function,
});
</script>

<style scoped>
.builder-container {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  width: 75%;
  min-width: 450px;
  padding: 20px;
  height: 85%;
  background-color: var(--color-primary);
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-self: center;
  align-self: center;
}

.subcontainer {
  width: 50%;
  gap: 12px;
  display: flex;
  flex-direction: column;
  justify-self: center;
}

.element-container {
  width: 100%;
  height: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  overflow: auto scroll;
  overflow-y: auto;
  scrollbar-color: var(--color-text-secondary) transparent;
}

.title-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 10px;
  border-width: 0px 0px 2px 0px;
  border-color: var(--color-secondary);
  border-style: solid;
  align-items: center;
  justify-items: center;
}

.title {
  font-size: 20px;
  text-align: center;
  margin-top: 6px;
  padding-bottom: 12px;
  width: 100%;
}
</style>
