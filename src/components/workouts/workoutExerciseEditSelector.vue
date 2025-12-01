<template>
    <v-card class="exercise-editor-container rounded-xl">
        <div class="selector-subcontainer">
            <div v-if="workoutExercise != null" class="selector-title-container">
                <div class="selector-title">{{ exercise.name }}</div>
                <div class="selector-subtitle">{{ exercise.type }}{{ exercise.description ? ` - ${exercise.description}` : `` }}</div>
            </div>
            <div class="selector-button-container">
                <v-btn
                    class="select-button"
                    variant="text"
                    @click="$emit('exercise-selected', workoutExercise)"
                    >Edit</v-btn
                >
                <v-btn
                    class="delete-button"
                    variant="text"
                    @click="$emit('exercise-deleted', workoutExercise)"
                    >Delete</v-btn
                >
            </div>
        </div>
    </v-card>
</template>

<style scoped>
.exercise-editor-container {
    background-color: var(--btn-secondary);
    height: 80px;
    width: 100%;
    padding: 12px 24px 8px 24px;
    flex: 0 0 auto;
}

.selector-subcontainer {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.selector-title-container {
    overflow: hidden;
}

.selector-title {
    font-size: 20px;
    color: var(--color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.selector-subtitle {
    font-size: 16px;
    color: var(--color-text-secondary);
    margin-top: -2px;
    margin-left: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.selector-button-container {
    height: 150%;
    width: 80px;
    min-width: 64px;
    margin-left: auto;
    margin-right: -8px;
    padding-left: 8px;
    align-self: center;
    justify-content: center;
    align-content: center;
}

.delete-button {
    height: 40% !important;
    width: 100%;
    min-width: 100%;
    color: var(--color-text-secondary);
    font-size: 16px;
}

.select-button {
    height: 40% !important;
    width: 100%;
    min-width: 100%;
    color: var(--color-text-secondary);
    font-size: 16px;
}
</style>

<script setup>
import Exercise from "../../classes/Exercise";
import exerciseServices from "../../services/exerciseServices";
import { ref, onMounted } from "vue";

const props = defineProps(["workoutExercise"]);
const exercise = ref({});

onMounted(() => {
    exerciseServices.get(props.workoutExercise.exerciseID).then((data) => {
        exercise.value = new Exercise(
            data.name,
            data.type,
            data.description,
            data.coachID,
            data.id
        );
    });
});
// load the workout as well
</script>
