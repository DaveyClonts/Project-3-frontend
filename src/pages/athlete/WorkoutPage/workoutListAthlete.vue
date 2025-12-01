<template>
    <v-card class="builder-container rounded-xl">
        <div class="subcontainer">
            <div class="title">Workout List</div>
            <div class="element-container">
            <WorkoutDisplay
                v-for="workout in workouts"
                :key="workout.id"
                :workout="workout"
            />
            </div> 
        </div>
    </v-card>
</template>

<script setup>
import WorkoutDisplay from "./workoutDisplayAthlete.vue";

const props = defineProps({
    workouts: {
        type: Array,
        default: () => [],
    },
    getWorkouts: Function,
});
</script>

<style scoped>
.builder-container {
    margin-left: 5%;
    margin-right: 5%;
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
