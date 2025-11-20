<template>
    <v-card class="selector-container rounded-xl">
        <div class="selector-subcontainer">
            <div v-if="workoutExercise != null">
                <div class="selector-title">{{ workoutExercise.exerciseID }}</div>
                <div class="selector-subtitle">{{ workoutExercise.workoutID }}</div>
            </div>
            <div class="selector-button-container">
                <v-btn
                    class="select-button"
                    variant="text"
                    :ripple="{ class: 'text-white' }"
                    @click="$emit('workout-selected', workout)"
                    >Edit</v-btn
                >
                <v-btn
                    class="delete-button"
                    variant="text"
                    :ripple="{ class: 'text-white' }"
                    @click="$emit('workout-deleted', workout)"
                    >Delete</v-btn
                >
            </div>
        </div>
    </v-card>
</template>

<style scoped>
.selector-container {
    background-color: #848484;
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

.selector-title {
    font-size: 20px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.selector-subtitle {
    font-size: 16px;
    color: whitesmoke;
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
    color: rgb(214, 214, 214);
    font-size: 16px;
}

.select-button {
    height: 40% !important;
    width: 100%;
    min-width: 100%;
    color: rgb(214, 214, 214);
    font-size: 16px;
}
</style>

<script setup>
const props = defineProps(["workoutExercise"]);

// load the workout as well
</script>