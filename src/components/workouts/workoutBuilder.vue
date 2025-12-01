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
                        v-for="exercise in workoutExercises"
                        :workoutExercise="exercise"
                        @exercise-deleted="deleteExercise"
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
import WorkoutExercise from "../../classes/WorkoutExercise.js";
import exerciseServices from "../../services/exerciseServices.js";
import Workout from "../../classes/Workout.js";
import workoutServices from "../../services/workoutServices.js";

const props = defineProps({
    workout: Workout,
});
const exercises = ref([]);
const workoutExercises = ref([]);
const deletedExercises = ref([]);

defineExpose({
    workoutExercises,
    deletedExercises
});

exerciseServices.getAllForUser().then((data) => {
    exercises.value = data.map(
        (e) => new Exercise(e.name, e.type, e.description, e.coachID, e.id)
    );
});

workoutServices.getExercises(props.workout.id).then((data) => {
    workoutExercises.value = data;
});

function addExercise(exercise) {
    let workoutExercise = new WorkoutExercise(props.workout.id, exercise.id);

    workoutExercises.value.push(workoutExercise);
}

function deleteExercise(workoutExercise) {
    let index = workoutExercises.value.indexOf(workoutExercise);

    console.log("Delete exercise: " + index);

    deletedExercises.value.push(workoutExercise);
    workoutExercises.value.splice(index, 1);

    console.log("Exercises: " + JSON.stringify(workoutExercises.value));
}
</script>
