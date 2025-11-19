<template>
    <v-card class="goal-card" @click="handleClick">
        <h2>{{ props.goal.name }}</h2>
        <h2>{{ props.goal.description }}</h2>
        <h2>{{ props.goal.dueDate }}</h2>
    </v-card>
    <GoalViewPopup
        v-model:show="showGoalViewPopup"
        :goal="props.goal"
        :refresh="refresh"
    />
</template>

<script setup>
import { ref } from "vue";
import GoalViewPopup from "./goalViewPopup.vue";

const props = defineProps({
    goal: Object,
    refresh: Function,
});
const showGoalViewPopup = ref(false);

console.log(props.goal);

const handleClick = () => {
    showGoalViewPopup.value = true;
};
</script>

<style scoped>
.goal-card {
    border: 1px solid #000000;
    border-radius: 8px;
    padding: 16px;
    background-color: #f9f9f9;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
</style>
