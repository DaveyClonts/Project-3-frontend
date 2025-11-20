<template>
  <v-card class="builder-container rounded-xl">
    <div class="subcontainer right-outline">
      <div class="title">Goal List</div>
      <GoalDisplay v-for="goal in goals" :key="goal.goalID" :goal="goal" />
      <AddGoalButtonAthlete :refresh="refresh" />
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
  refresh: Function
});
</script>

<style scoped>
.builder-container {
  height: 80vh;
  width: 30%;
  background-color: #d0d0d0;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.subcontainer {
  width: 80%;
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto scroll;
  overflow-y: auto;
}

.title {
  border-width: 0px 0px 2px 0px;
  border-color: rgb(82, 82, 82);
  border-style: solid;
  font-size: 20px;
  text-align: center;
  margin-top: 6px;
  padding-bottom: 12px;
  width: 100%;
}

</style>
