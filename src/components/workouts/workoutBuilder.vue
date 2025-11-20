<template>
    <div v-if="workout != null">
        <v-text-field
            label="Workout Title"
            v-model="workout.name"
            placeholder="Workout"
            type="input"
            class="workout-name"
        ></v-text-field>
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
                    <workoutExerciseEditor
                        v-for="exercise in selectedExercises"
                        :workoutExercise="exercise"
                    />
                </div>
            </div>
        </v-card>
    </div>
</template>

<style scoped>
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

.workout-name ::v-deep .v-label {
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
</style>

<script setup>
import { ref } from "vue";
import workoutExerciseSelector from "./workoutExerciseSelector.vue";
import workoutExerciseEditor from "./workoutExerciseEditor.vue";
import Exercise from "../../classes/Exercise.js";
import ExerciseType from "../../classes/ExerciseType.js";
import WorkoutExercise from "../../classes/WorkoutExercise.js";

const props = defineProps(["workout"]);
const selectedExercises = ref([]);

const exercises = [
    new Exercise("Squat", ExerciseType.WEIGHTS, "my description yay", 1, 1),
    new Exercise("Run", ExerciseType.CARDIO, 1, 2),
];

const workoutExercises = [
    WorkoutExercise.WeightExercise(3, 1, 8, 3, 225),
    WorkoutExercise.CardioExercise(4, 2, 5, 50),
];

selectedExercises.value = workoutExercises.filter((exercise) => {
    if (exercise.workoutID == props.workout.id) {
        console.log("add exercise: " + JSON.stringify(exercise));
        return exercise;
    }
});

console.log("selected exercises: " + JSON.stringify(selectedExercises.value));

function addExercise(exercise) {}
</script>
