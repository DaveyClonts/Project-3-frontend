<template>
  <v-btn @click="showAddGoalPopup = true">Add Goal</v-btn>

  <AddGoalPopupAthlete 
    v-model:show="showAddGoalPopup" 
    :refresh="refresh"
  />
</template>

<script setup>
import { ref } from "vue";
import AddGoalPopupAthlete from "./goalAddPopupAthlete.vue";

const props = defineProps({
  refresh: Function
});

const showAddGoalPopup = ref(false);
</script>
