<template>
    <v-card class="top-container">
        <div class="top-subcontainer">
            <div class="title">Workouts</div>
            <div v-for="workout in workouts">
                <workout-selector
                    :workout="workout"
                    @workout-selected="onWorkoutSelected"
                />
            </div>
        </div>
    </v-card>
    <v-dialog class="dialog" v-model="isDialogVisible">
        <v-card title="Workout Builder">
            <workout-builder />
            <div class="button-container">
                <v-btn @click="save()">Save</v-btn>
                <v-btn @click="cancel()">Cancel</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.top-container {
    margin-top: 8px;
    min-width: 450px;
    padding: 20px;
    height: 80vh;
    background-color: #d0d0d0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-self: center;
}

.top-subcontainer {
    width: 100%;
    gap: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto scroll;
    overflow-y: auto;
}

.workout-list {
    width: 100%;
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

.dialog {
    max-width: 950px;
}

.button-container {
    margin: 0 12px 12px auto;
    display: flex;
    gap: 16px;
}
</style>

<script setup>
import { ref } from "vue";
import workoutBuilder from "../../components/workoutBuilder.vue";
import workoutSelector from "../../components/workoutSelector.vue";
import Workout from "../../classes/Workout.js";

const isDialogVisible = ref(false);

// load all workouts
const workouts = [
    new Workout("Workout #1", "11/17/25", 1),
    new Workout("Workout #2", "11/17/26", 2),
    new Workout("Workout #3", "11/17/27", 3),
];

function save() {
    closeDialog();
}

function cancel() {
    closeDialog();
}

function openDialog() {
    isDialogVisible.value = true;
}

function closeDialog() {
    isDialogVisible.value = false;
}

function onWorkoutSelected(id) {
    console.log("Selected workout: " + id);
    openDialog();
}
</script>
