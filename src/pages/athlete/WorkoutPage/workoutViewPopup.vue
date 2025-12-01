<template>
  <div
    v-if="showWorkoutViewPopup"
    class="modal-overlay"
    @click.self="closeDialog"
  >
    <v-card class="builder-container rounded-xl">
      <div class="subcontainer right-outline">
        <div class="title">Exercise List</div>
        <ExerciseDisplay
          v-for="exercise in exercises"
          :key="exercise.id"
          :exercise="getExercises()"
        />
      </div>
      <div class="subcontainer">
        <div class="title">Exercise</div>
      </div>
      <div class="button-container">
        <v-btn @click="closeDialog()">Close</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, toRef } from "vue";
import workoutServices from "../../../services/workoutServices";

const props = defineProps({
  show: Boolean,
  workout: Object,
  getAll: Function,
});

const emit = defineEmits(["update:show", "closeParentPopup"]);

const showWorkoutViewPopup = toRef(props, "show");

const exercises = ref([]);

async function getExercises() {
  const data = await workoutServices.getExercises(props.workout.id);
  console.log(data);
  exercises.value = data;
  return data;
}

function closeDialog() {
  emit("update:show", false);
}

getExercises();
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  will-change: auto !important;
}

.builder-container {
  margin-left: 25%;
  margin-right: 25%;
  min-width: 850px;
  padding: 20px;
  height: 80vh;
  background-color: #d0d0d0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-self: center;
  position: relative;
}

.subcontainer {
  width: 50%;
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto scroll;
  overflow-y: auto;
}

.modal {
  background-color: #ffffff;
  border-radius: 40px;
  padding: 2rem;
  width: 80%;
  max-width: 90%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  will-change: auto !important;
}

.button-container {
  position: absolute;
  bottom: 16px;
  right: 16px;
}

.right-outline {
  border-width: 0px 2px 0px 0px;
  border-color: rgb(82, 82, 82);
  border-style: solid;
}

.title {
  border-width: 0px 0px 2px 0px;
  border-color: rgb(82, 82, 82);
  border-style: solid;
  font-size: 20px;
  text-align: center;
  margin-top: 6px;
  padding-bottom: 12px;
  width: 100%;
}
</style>
