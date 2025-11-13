<template>
    <div>
        <button @click="showGoalEditPopup = true">Edit</button>

        <GoalEditPopup v-model:show="showGoalEditPopup" :goalID="props.goal" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import GoalEditPopup from "./goalEditPopupAthlete.vue";

const showGoalEditPopup = ref(false);

const props = defineProps({
    goal: {
        type: String,
    },
});
</script>

<style scoped>
.buttons {
    margin-top: 1rem;
    text-align: right;
}
</style>