<template>
  <v-card class="goal-container rounded-xl" @click="handleClick">
    <div class="goal-subcontainer">
      <div>
        <div class="goal-title">{{ props.goal.name }}</div>
        <div class="goal-subtitle">{{ props.goal.date }}</div>
      </div>
    </div>
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
  background-color: var(--btn-secondary);
  height: 80px;
  width: 95%;
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
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.goal-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-top: -2px;
  margin-left: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
