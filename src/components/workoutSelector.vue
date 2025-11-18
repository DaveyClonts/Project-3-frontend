<template>
    <v-card class="selector-container rounded-xl">
        <div class="selector-subcontainer">
            <div>
                <div class="selector-title">{{ $props.workout.name }}</div>
                <div class="selector-subtitle">{{ $props.workout.date }}</div>
            </div>
            <v-dialog>
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                        class="select-button rounded-xl"
                        v-bind="activatorProps"
                        variant="text"
                        :ripple="{ class: 'text-white' }"
                        @click="$emit('workout-selected', workout.id)"
                        >Edit</v-btn
                    >
                </template>
                <template v-slot:default="{ isActive }">
                    <v-card title="Workout Builder">
                        <workoutBuilder />
                    </v-card>
                </template>
            </v-dialog>
        </div>
    </v-card>
</template>

<style scoped>
.selector-container {
    background-color: #848484;
    height: 80px;
    width: 380px;
    padding: 12px 24px 8px 24px;
    flex: 0 0 auto;
}

.selector-subcontainer {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.select-button {
    height: 150% !important;
    width: 40px;
    margin-left: auto;
    margin-right: -24px;
    padding-left: 8px;
    align-self: center;
    color: white;
    font-size: 16px;
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
</style>

<script setup>
import workoutBuilder from "./workoutBuilder.vue";

const props = defineProps(["workout"]);
</script>
