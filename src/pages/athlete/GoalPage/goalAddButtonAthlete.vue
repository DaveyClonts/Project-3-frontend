<template>
  <v-btn @click="showAddGoalPopup = true">Add Goal</v-btn>
  <AddGoalPopupAthlete 
    v-model:show="showAddGoalPopup" 
    />
</template>
<script setup>
import { ref } from "vue";
import AddGoalPopupAthlete from "./goalAddPopupAthlete.vue";

const showAddGoalPopup = ref(false);
</script>
<style scoped>
.buttons {
  margin-top: 1rem;
  text-align: right;
}
</style>
