<template>
    <div class="editor-container" v-if="exercise != null">
        <v-text-field
            label="Title"
            v-model="exercise.name"
            placeholder="Exercise"
            type="input"
            class="exercise-name"
        ></v-text-field>
        <v-autocomplete
            label="Type"
            :items="exerciseTypeArray"
            v-model="exercise.type"
        >
        </v-autocomplete>
    </div>
</template>

<style scoped>
.editor-container {
    margin-bottom: 16px;
    width: 95%;
    padding: 12px;
    height: 16vh;
    background-color: var(--color-primary);
    justify-content: center;
    justify-self: center;
    align-self: center;
}
</style>

<script setup>
import { ref } from "vue";
import Exercise from "../../classes/Exercise.js";
import { exerciseTypeArray } from "../../classes/ExerciseType.js";

const props = defineProps(["exercise"]);
</script>
