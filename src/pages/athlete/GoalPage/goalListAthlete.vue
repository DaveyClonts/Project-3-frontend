<template>
  <v-card class="builder-container rounded-xl">
    <div class="subcontainer">
      <div class="title-container">
        <div class="title">Goal List</div>
        <AddGoalButtonAthlete :refresh="refresh" />
      </div>
      <div class="list-container">
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
  width: 500px;
  padding: 20px;
  height: 80vh;
  background-color: var(--color-primary);
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.subcontainer {
  width: 90%;
  gap: 12px;
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
  width: 100%;
  padding-top: 10px;
  border-width: 0px 0px 2px 0px;
  border-color: rgb(82, 82, 82);
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
