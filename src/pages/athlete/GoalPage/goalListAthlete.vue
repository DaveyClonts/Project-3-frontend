<template>
  <v-card class="builder-container rounded-xl">
    <div class="subcontainer">
      <div class="title-container">
        <div class="title">Goal List</div>
        <AddGoalButtonAthlete :refresh="refresh" />
      </div>
      <div class="list-containter">
        <GoalDisplay v-for="goal in goals" :key="goal.goalID" :goal="goal" />
      </div>
    </div>
  </v-card>
</template>

<script setup>
import GoalDisplay from "./goalDisplayAthlete.vue";
import AddGoalButtonAthlete from "./goalAddButtonAthlete.vue";

const props = defineProps({
  goals: {
    type: Array,
    default: () => [],
  },
  refresh: Function,
});
</script>

<style scoped>
.builder-container {
  margin-top: 8px;
  min-width: 500px;
  padding: 20px;
  height: 80vh;
  background-color: var(--color-primary);
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-self: center;
}

.subcontainer {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 20px;
  text-align: center;
  margin-top: 6px;
  padding-bottom: 12px;
  width: 100%;
}

.title-container {
  display: flex;
  flex-direction: row;
  border-width: 0px 0px 2px 0px;
  border-color: var(--color-secondary);
  border-style: solid;
  align-items: center;
  justify-items: center;
}

.list-container {
  width: 100%;
  height: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  overflow: auto scroll;
  overflow-y: auto;
  scrollbar-color: var(--color-text-secondary) transparent;
}
</style>
