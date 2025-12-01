<template>
    <div v-if="exercise != null">
        <div class="editor-title">
            <v-label :text="exercise.name"></v-label>
        </div>
        <v-card class="editor-container rounded-xl">
            <v-form class="editor-form">
                <div v-if="exercise.type == ExerciseType.Weights">
                    <v-number-input
                        v-model="sets"
                        label="Sets"
                    ></v-number-input>
                    <v-number-input
                        v-model="reps"
                        label="Reps"
                    ></v-number-input>
                    <v-number-input
                        v-model="weight"
                        label="Weight"
                        suffix="lbs"
                    ></v-number-input>
                </div>
                <div v-else>
                    <v-number-input
                        v-model="miles"
                        label="Distance"
                        suffix="miles"
                    ></v-number-input>
                    <v-number-input
                        v-model="time"
                        label="Time"
                        suffix="minutes"
                    >
                    </v-number-input>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<style scoped>
.editor-title :deep(.v-label) {
    display: flex;
    flex-direction: row;
    margin: 12px auto 6px 24px;
    font-size: 24px;
    color: var(--color-text);
}

.editor-container {
    margin-left: 25%;
    margin-right: 25%;
    margin-bottom: 16px;
    width: 90%;
    padding: 20px;
    height: 40vh;
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

.editor-form {
    width: 100%;
    justify-content: center;
    align-content: center;
}
</style>

<script setup>
import WorkoutExercise from "../../classes/WorkoutExercise.js";
import { ref, onMounted } from "vue";
import exerciseServices from "../../services/exerciseServices.js";
import ExerciseType from "../../classes/ExerciseType.js";

const props = defineProps({
    workoutExercise: WorkoutExercise,
});

const exercise = ref(null);
const sets = ref(0);
const reps = ref(0);
const weight = ref(0);
const miles = ref(0);
const time = ref(0);

defineExpose({
    exercise,
    sets,
    reps,
    weight,
    miles,
    time,
});

onMounted(() => {
    if (props.workoutExercise.weight !== undefined) {
        sets.value = props.workoutExercise.sets;
        reps.value = props.workoutExercise.reps;
        weight.value = props.workoutExercise.weight;
    } else {
        miles.value = props.workoutExercise.miles;
        time.value = props.workoutExercise.time;
    }

    exerciseServices.get(props.workoutExercise.exerciseID).then((response) => {
        exercise.value = response;
    });
});
</script>
