<template>
    <v-card class="workout-container">
        <div class="subcontainer">
            <div class="title">Workouts</div>
            <div v-for="workout in workouts">
                <workout-selector
                    :workout="workout"
                    @workout-selected="onWorkoutSelected"
                />
            </div>
        </div>
    </v-card>
</template>

<style scoped>
.builder-container {
    margin-left: 25%;
    margin-right: 25%;
    min-width: 650px;
    padding: 20px;
    height: 80vh;
    background-color: #d0d0d0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-self: center;
}

.subcontainer {
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
</style>

<script setup>
import workoutBuilder from "../../components/workoutBuilder.vue";
import workoutSelector from "../../components/workoutSelector.vue";
import Workout from "../../classes/Workout.js";

// load all workouts
const workouts = [
    new Workout("Workout #1", "11/17/25", 1),
    new Workout("Workout #2", "11/17/26", 2),
    new Workout("Workout #3", "11/17/27", 3),
];

function onWorkoutSelected(id) {
    console.log("Selected workout: " + id);
}
</script>
