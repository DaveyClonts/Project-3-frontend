<template>
    <v-card class="top-container rounded-xl">
        <div class="top-subcontainer">
            <div class="title-container">
                <div class="title">Exercises</div>
                <v-btn
                    class="add-exercise-button"
                    :ripple="{ class: 'text-white' }"
                    @click="openAddExerciseDialog"
                    >+</v-btn
                >
            </div>
            <div class="top-element-container">
                <exerciseSelector
                    v-for="exercise in exercises"
                    :exercise="exercise"
                    @exercise-selected="onExerciseSelected"
                    @exercise-deleted="onExerciseDeleted"
                />
            </div>
        </div>
    </v-card>
    <v-dialog class="dialog" v-model="isDialogVisible" @close="clearExercise">
        <v-card :title="dialogTitle">
            <exerciseEditor :exercise="selectedExercise" />
            <div class="button-container">
                <v-btn class="save-button" @click="save()">Save</v-btn>
                <v-btn class="cancel-button" @click="cancel()">Cancel</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.top-container {
    margin-top: 8px;
    width: 500px;
    padding: 20px;
    height: 80vh;
    background-color: var(--color-primary);
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-self: center;
}

.top-subcontainer {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.title-container {
    display: flex;
    flex-direction: row;
    border-width: 0px 0px 2px 0px;
    border-color: var(--color-secondary);
    border-style: solid;
    align-items: center;
    justify-items: center;
}

.add-exercise-button {
    background-color: var(--btn-secondary);
    color: var(--btn-secondary-text);
    height: 32px;
    width: 32px;
    min-width: 32px !important;
    margin-bottom: 8px;
}

.top-element-container {
    width: 100%;
    height: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-color: var(--color-text-secondary) transparent;
}

.workout-list {
    width: 100%;
}

.title {
    font-size: 20px;
    text-align: center;
    margin-top: 6px;
    padding-bottom: 12px;
    width: 100%;
}

.dialog {
    max-width: 950px;
    min-width: 450px;
}

.button-container {
    margin: 36px 12px 12px auto;
    display: flex;
    gap: 16px;
}

.builder-card {
    background-color: var(--color-bg);
}

.save-button {
    background-color: var(--btn-primary);
    color: var(--btn-primary-text);
}

.cancel-button {
    background-color: var(--color-text-secondary);
    color: var(--btn-primary-text);
}
</style>

<script setup>
import { ref } from "vue";
import exerciseEditor from "../../components/exercises/exerciseEditor.vue";
import exerciseSelector from "../../components/exercises/exerciseSelector.vue";
import Exercise from "../../classes/Exercise";
import ExerciseType from "../../classes/ExerciseType";
import exerciseServices from "../../services/exerciseServices";
import store from "../../store/store";

const dialogTitle = ref("");
const isDialogVisible = ref(false);
const selectedExercise = ref(null);
const exercises = ref([]);

loadExercises();

function openAddExerciseDialog() {
    dialogTitle.value = "Add New Exercise";
    selectedExercise.value = new Exercise("New Exercise", ExerciseType.Weights, "");
    
    isDialogVisible.value = true;
}

function openEditExerciseDialog(exercise) {
    dialogTitle.value = "Edit Exercise";
    selectedExercise.value = new Exercise(
        exercise.name,
        exercise.type,
        exercise.description,
        exercise.coachID,
        exercise.id
    );

    isDialogVisible.value = true;
}

function addExercise(exercise) {
    exercise.coachID = store.getUser().id;

    console.log("Add exercise: " + JSON.stringify(exercise));

    exerciseServices.create(exercise).then(() => {
        closeDialog();
        loadExercises();
    });
}

function deleteExercise(exercise) {
    exerciseServices.delete(exercise.id).then(() => {
        closeDialog();
        loadExercises();
    });
}

function updateExercise(exercise) {
    exerciseServices.update(exercise).then(() => {
        closeDialog();
        loadExercises();
    });
}

function save() {
    if (selectedExercise.value.id == null) addExercise(selectedExercise.value);
    else updateExercise(selectedExercise.value);
}

function cancel() {
    closeDialog();
}

function closeDialog() {
    isDialogVisible.value = false;
}

function clearExercise() {
    selectedExercise.value = null;
}

function onExerciseSelected(exercise) {
    console.log("Selected exercise: " + exercise.name);
    openEditExerciseDialog(exercise);
}

function onExerciseDeleted(exercise) {
    console.log("Delete requested for exercise: " + exercise.name);
    deleteExercise(exercise);
}

function loadExercises() {
    exerciseServices
        .getAllForUser()
        .then((databaseExercises) => {
            exercises.value = databaseExercises;
        })
        .catch((err) => {
            console.error("Error loading exercises: " + err);
        });
}
</script>
