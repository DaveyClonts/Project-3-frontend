<template>
  <div
    v-if="showWorkoutViewPopup"
    class="modal-overlay"
    @click.self="closeDialog"
  >
    <v-card class="builder-container rounded-xl">
      <div class="subcontainer right-outline">
        <div class="title-container">
          <div class="title">Exercise List</div>
        </div>
        <div class="content-container">
          <ExerciseList
            v-for="exercise in exercises"
            :key="exercise.id"
            :exercise="exercise"
            @update:showExercise="showExercise = $event"
          />
        </div>
      </div>
      <div class="subcontainer">
        <div class="title-container">
          <div class="title">Exercise</div>
        </div>
        <div class="content-container">
          <ExerciseInfo
            v-if="showExercise !== null && exerciseMatch !== null"
            :exercise="exercises.find((e) => e.id === showExercise)"
            :exerciseMatch="exerciseMatch"
          />
          <div v-else>
            <p style="color: white">No exercise selected</p>
          </div>
        </div>
      </div>
      <div class="button-container">
        <v-btn @click="closeDialog()">Close</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, toRef, watch } from "vue";
import workoutServices from "../../../services/workoutServices";
import exerciseServices from "../../../services/exerciseServices";
import ExerciseList from "./exerciseListAthlete.vue";
import ExerciseInfo from "./exerciseInfoAthlete.vue";

const props = defineProps({
  show: Boolean,
  workout: Object,
  getAll: Function,
});
const showExercise = ref(null);

const emit = defineEmits(["update:show", "closeParentPopup"]);

const showWorkoutViewPopup = toRef(props, "show");

const exercises = ref([]);
const exerciseMatch = ref(null);

async function getExercises() {
  const workoutMatch = await workoutServices.getExercises(props.workout.id);
  const data = await Promise.all(
    workoutMatch.map((w) => exerciseServices.get(w.exerciseID))
  );
  exercises.value = data;
}

async function loadExerciseMatch(exerciseID) {
  if (!exerciseID) return;
  exerciseMatch.value = await workoutServices.getOneExercise(
    props.workout.id,
    exerciseID
  );
}

watch(showExercise, (val) => {
  loadExerciseMatch(val);
});

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
  width: 75%;

  height: 80vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-self: center;
  position: relative;
  width: 60%;
  max-width: 90%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  will-change: auto !important;
  background-color: var(--color-primary);
  justify-content: center;
  justify-self: center;
  align-self: center;
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

.content-container {
  width: 100%;
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto scroll;
  overflow-y: auto;
  padding: 20px;
}

.button-container {
  position: absolute;
  bottom: 16px;
  right: 16px;
}

.right-outline {
  border-width: 0px 2px 0px 0px;
  border-color: var(--color-secondary);
  border-style: solid;
}

.title {
  font-size: 20px;
  text-align: center;
  margin-top: 6px;
  padding-bottom: 12px;
  width: 100%;
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
</style>
