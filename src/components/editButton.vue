<template>
    <v-btn variant="tonal" class="add-button" @click="popup = true">
        Edit
    </v-btn>

    <addAthletePopup v-model="popup">
        
    </addAthletePopup>
</template>

<style scoped>
.add-button {
    background-color: var(--btn-secondary);
    color: var(--btn-secondary-text);
    border-radius: 40px;
    min-width: 5vh;
    height: 5vh;
}
</style>

<script setup>
import { ref } from "vue";
import addAthletePopup from "./addAthletePopup.vue";

const popup = ref(false);
</script>