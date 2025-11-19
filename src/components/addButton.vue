<template>
    <v-btn variant="tonal" class="add-button" @click="popup = true">
        <v-icon>mdi-plus</v-icon>
    </v-btn>

    <addAthletePopup v-model="popup">

    </addAthletePopup>
</template>

<style scoped>
.add-button {
    background-color: grey;
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