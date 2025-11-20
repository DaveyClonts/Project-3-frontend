<template>
    <v-card class="top-container rounded-xl">
        <div class="top-subcontainer">
            <div class="title-container">
                <div class="title">Workouts</div>
                <v-btn
                    class="add-workout-button"
                    :ripple="{ class: 'text-white' }"
                    >+</v-btn
                >
            </div>
            <div class="top-element-container">
                <workout-selector
                    v-for="workout in workouts"
                    :workout="workout"
                    @workout-selected="onWorkoutSelected"
                    @workout-deleted="onWorkoutDeleted"
                />
            </div>
        </div>
    </v-card>
    <v-dialog class="dialog" v-model="isDialogVisible">
        <v-card>
            <workout-builder :workout="selectedWorkout" />
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
    min-width: 500px;
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

.add-workout-button {
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
    overflow: auto scroll;
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
    margin: 0 12px 12px auto;
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
import workoutBuilder from "../../components/workouts/workoutBuilder.vue";
import workoutSelector from "../../components/workouts/workoutSelector.vue";
import Workout from "../../classes/Workout.js";

const isDialogVisible = ref(false);
const selectedWorkout = ref(null);

// load all workouts
const workouts = [
    new Workout("Chest, Triceps, Shoulders", "11/17/25", 1),
    new Workout("Back, Biceps", "11/17/26", 2),
    new Workout("Legs", "11/17/27", 3),
    new Workout("Cardio", "11/17/25", 4),
    new Workout("Workout #5", "11/17/26", 5),
    new Workout("Workout #6", "11/17/27", 6),
    new Workout("Workout #7", "11/17/25", 7),
    new Workout("Workout #8", "11/17/26", 8),
    new Workout("Workout #9", "11/17/27", 9),
];

function save() {
    closeDialog();
}

function cancel() {
    closeDialog();
}

function openDialog(workout) {
    selectedWorkout.value = workout;
    isDialogVisible.value = true;
}

function closeDialog() {
    selectedWorkout.value = null;
    isDialogVisible.value = false;
}

function onWorkoutSelected(workout) {
    console.log("Selected workout: " + workout.name);
    openDialog(workout);
}

function onWorkoutDeleted(workout) {
    console.log("Delete requested for workout: " + workout.name);
}
</script>
