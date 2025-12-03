<template>
    <div class="editor-container" v-if="exercise != null">
        <v-form v-model="isFormValid">
            <v-text-field
                label="Title"
                v-model="exercise.name"
                placeholder="Exercise"
                :rules="nameRules"
                type="input"
                class="exercise-name"
            ></v-text-field>
            <v-select
                label="Type"
                :items="exerciseTypeArray"
                v-model="exercise.type"
            >
            </v-select>
            <v-text-field label="Description" v-model="exercise.description">
            </v-text-field>
        </v-form>
    </div>
</template>

<style scoped>
.editor-container {
    margin-bottom: 16px;
    width: 95%;
    padding: 12px;
    height: 28vh;
    background-color: var(--color-primary);
    justify-content: center;
    justify-self: center;
    align-self: center;
}
</style>

<script setup>
import { ref } from "vue";
import { exerciseTypeArray } from "../../classes/ExerciseType.js";

const props = defineProps(["exercise"]);
const isFormValid = ref(false);

const nameRules = [
    (value) => {
        return !!value || "Name is required";
    },
];

defineExpose({ isFormValid });
</script>
