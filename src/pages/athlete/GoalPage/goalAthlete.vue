<template><GoalListAthlete :goals="goals" :refresh="refresh" /></template>

<script setup>
import GoalListAthlete from "./goalListAthlete.vue";
import { ref } from "vue";
import goalServices from "../../../services/goalServices";

const goals = ref([]);

async function refresh() {
    const data = await goalServices.getAll();
    goals.value = data;
    return data;
}

refresh();
</script>

<style scoped></style>
