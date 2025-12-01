<template>
  <v-card class="exercise-container rounded-xl">
    <div class="exercise-subcontainer">
      <div>
        <div class="exercise-title">{{ props.exercise.name }}</div>
        <div class="exercise-subtitle">{{ props.exercise.type }}</div>
        <div class="exercise-subtitle">{{ props.exercise?.description ?? "None"}}</div>

        <div v-if="props.exercise.type === 'Cardio'">
          <div class="exercise-subtitle">
            Miles: {{ props.exerciseMatch?.miles ?? "None" }}
          </div>
          <div class="exercise-subtitle">
            Time: {{ props.exerciseMatch?.time + " minutes" ?? "None" }}
          </div>
        </div>

        <div v-if="props.exercise.type === 'Weights'">
          <div class="exercise-subtitle">
            Sets: {{ props.exerciseMatch?.sets ?? "None" }}
          </div>
          <div class="exercise-subtitle">
            Reps: {{ props.exerciseMatch?.reps ?? "None" }}
          </div>
          <div class="exercise-subtitle">
            Weight: {{ props.exerciseMatch?.weight ?? "None" }}
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>

const props = defineProps({
  exercise: Object,
  exerciseMatch: Object,
});
</script>

<style scoped>
.exercise-container {
   background-color: var(--btn-secondary);
  height: auto;
  width: 95%;
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
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.exercise-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 12px;
  margin-left: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
