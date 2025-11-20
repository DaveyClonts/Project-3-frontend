<template>
      <v-card class="goal-container rounded-xl">
        <v-btn @click="showAddGoalPopup = true" class="button">Add Goal</v-btn>
      </v-card>

  <AddGoalPopupAthlete v-model:show="showAddGoalPopup" :refresh="refresh" />
</template>

<script setup>
import { ref } from "vue";
import AddGoalPopupAthlete from "./goalAddPopupAthlete.vue";

const props = defineProps({
  refresh: Function,
});

const showAddGoalPopup = ref(false);
</script>

<style scoped>
.button {
  background-color: #848484;
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
  font-size: 20px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.goal-container {
  background-color: #848484;
  height: 80px;
  width: 80%;
  flex: 0 0 auto;
}
</style>
