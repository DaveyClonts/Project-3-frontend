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
.goal-container {
  background-color: #848484;
  height: 80px;
  width: 100%;
  padding: 12px 24px 8px 24px;
  flex: 0 0 auto;
}

.goal-subcontainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.goal-title {
  font-size: 20px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.goal-subtitle {
  font-size: 16px;
  color: whitesmoke;
  margin-top: -2px;
  margin-left: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
