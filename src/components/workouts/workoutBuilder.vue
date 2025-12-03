<template>
    <div v-if="workout != null">
        <v-form v-model="isFormValid">
            <div class="builder-title">
                <v-text-field
                    label="Workout Title"
                    v-model="workout.name"
                    placeholder="Workout"
                    type="input"
                    class="workout-name"
                    :rules="nameRules"
                ></v-text-field>
                <v-date-input
                    v-model="workout.date"
                    label="Date"
                    prepend-icon=""
                    :rules="dateRules"
                ></v-date-input>
            </div>
        </v-form>
        <v-card class="builder-container rounded-xl">
            <div class="subcontainer right-outline">
                <v-label class="title opacity-100">Exercise List</v-label>
                <div class="element-container">
                    <workoutExerciseSelector
                        v-for="exercise in exercises"
                        :exercise="exercise"
                        @exercise-selected="addExercise"
                    />
                </div>
            </div>
            <div class="subcontainer">
                <v-label class="title opacity-100">Selected Exercises</v-label>
                <div class="element-container">
                    <workoutExerciseEditSelector
                        v-for="exercise in workoutExercises"
                        :workoutExercise="exercise"
                        @exercise-selected="editExercise"
                        @exercise-deleted="deleteExercise"
                    />
                </div>
            </div>
        </v-card>
    </div>
    <v-dialog class="dialog" v-model="isDialogVisible">
        <v-card class="dialog-card rounded-xl">
            <workoutExerciseEditor
                :workout-exercise="selectedWorkoutExercise"
                ref="exerciseEditor"
            />
            <div class="button-container">
                <v-btn
                    class="save-button"
                    :disabled="inputDisabled"
                    @click="saveExercise"
                    >Save</v-btn
                >
                <v-btn
                    class="cancel-button"
                    :disabled="inputDisabled"
                    @click="cancelEdit"
                    >Cancel</v-btn
                >
            </div>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.builder-title {
    display: flex;
    flex-direction: row;
}

.builder-container {
    margin-left: 25%;
    margin-right: 25%;
    margin-bottom: 16px;
    width: 90%;
    min-width: 450px;
    padding: 20px;
    height: 70vh;
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
    padding-left: 12px;
    padding-right: 12px;
    gap: 12px;
    display: flex;
    flex-direction: column;
    overflow: auto scroll;
    overflow-y: auto;
    align-items: center;
    justify-items: center;
    align-self: center;
    justify-self: center;
}

.right-outline {
    border-width: 0px 2px 0px 0px;
    border-color: var(--color-text-secondary);
    border-style: solid;
}

.workout-name :deep(v.label) {
    color: var(--color-secondary) !important;
}

.title {
    border-width: 0px 0px 2px 0px;
    border-color: var(--color-text-secondary);
    color: var(--color-text);
    border-style: solid;
    font-size: 20px;
    text-align: center;
    margin-top: 6px;
    padding-bottom: 12px;
    width: 100%;
    justify-content: center;
}

.save-button {
    background-color: var(--btn-primary);
    color: var(--btn-primary-text);
}

.cancel-button {
    background-color: var(--color-text-secondary);
    color: var(--btn-primary-text);
}

.dialog {
    max-width: 450px;
    height: 500px;
}

.dialog-card {
    background-color: var(--color-bg);
}

.button-container {
    margin: 0 12px 12px auto;
    display: flex;
    gap: 16px;
}
</style>

<script setup>
import { VDateInput } from "vuetify/labs/VDateInput";
import { ref } from "vue";
import workoutExerciseSelector from "./workoutExerciseSelector.vue";
import workoutExerciseEditSelector from "./workoutExerciseEditSelector.vue";
import workoutExerciseEditor from "./workoutExerciseEditor.vue";
import WorkoutExercise from "../../classes/WorkoutExercise.js";
import exerciseServices from "../../services/exerciseServices.js";
import Workout from "../../classes/Workout.js";
import workoutServices from "../../services/workoutServices.js";
import ExerciseType from "../../classes/ExerciseType.js";

const props = defineProps({
    workout: Workout,
});
const exercises = ref([]);
const workoutExercises = ref([]);
const deletedExercises = ref([]);
const selectedWorkoutExercise = ref(null);
const exerciseEditor = ref(null);
const isDialogVisible = ref(false);
const inputDisabled = ref(false);
const isFormValid = ref(false);

const nameRules = [
    (value) => {
        return !!value || "Name is required";
    },
];

const dateRules = [
    (value) => {
        return !!value || "Date is required";
    },
];

defineExpose({
    workoutExercises,
    deletedExercises,
    isFormValid,
});

workoutServices.getExercises(props.workout.id).then((data) => {
    workoutExercises.value = data;

    loadExercises();
});

function addExercise(exercise) {
    let workoutExercise = null;

    if (exercise.type == ExerciseType.Weights)
        workoutExercise = WorkoutExercise.WeightExercise(
            props.workout.id,
            exercise.id,
            8,
            3,
            50,
            false
        );
    else
        workoutExercise = WorkoutExercise.CardioExercise(
            props.workout.id,
            exercise.id,
            5,
            30,
            false
        );

    console.log("add exercise: " + JSON.stringify(workoutExercise));
    workoutExercises.value.push(workoutExercise);

    loadExercises();
}

function deleteExercise(workoutExercise) {
    let index = workoutExercises.value.indexOf(workoutExercise);

    deletedExercises.value.push(workoutExercise);
    workoutExercises.value.splice(index, 1);

    loadExercises();
}

function editExercise(workoutExercise) {
    selectedWorkoutExercise.value = workoutExercise;

    isDialogVisible.value = true;
}

function loadExercises() {
    exercises.value = [];

    exerciseServices.getAllForUser().then((data) => {
        exercises.value = data.filter(
            (e) => !workoutExercises.value.some((we) => we.exerciseID == e.id)
        );
    });
}

function saveExercise() {
    if (exerciseEditor.value.exercise.type == ExerciseType.Weights) {
        selectedWorkoutExercise.value.reps = exerciseEditor.value.reps;
        selectedWorkoutExercise.value.sets = exerciseEditor.value.sets;
    } else {
        selectedWorkoutExercise.value.miles = exerciseEditor.value.miles;
        selectedWorkoutExercise.value.time = exerciseEditor.value.time;
    }

    isDialogVisible.value = false;
}

function cancelEdit() {
    isDialogVisible.value = false;
}
</script>
