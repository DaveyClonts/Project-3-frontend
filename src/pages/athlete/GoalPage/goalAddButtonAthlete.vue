<template>
  <v-btn
    class="add-workout-button"
    :ripple="{ class: 'text-white' }"
    @click="showAddGoalPopup = true"
    >+</v-btn
  >

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
.add-workout-button {
  background-color: #848484;
  color: white;
  height: 32px;
  width: 32px;
  min-width: 32px !important;
  margin-bottom: 8px;
}

.goal-container {
  background-color: #848484;
  height: 80px;
  width: 80%;
  flex: 0 0 auto;
}
</style>
