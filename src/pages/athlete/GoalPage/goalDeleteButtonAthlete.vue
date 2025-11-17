<template>
  <div>
    <button @click="showDeleteGoalPopup = true">Delete</button>

    <DeleteGoalPopup
      v-model:show="showDeleteGoalPopup"
      :goal="goal"
      :refresh="refresh"
      @closeParentPopup="$emit('closeParentPopup')"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DeleteGoalPopup from './goalDeletePopupAthlete.vue';

const showDeleteGoalPopup = ref(false)

const props = defineProps({
  goal: Object,
  refresh: Function
});

const emit = defineEmits(["closeParentPopup"]);

</script>

<style scoped>
.buttons {
  margin-top: 1rem;
  text-align: right;
}
</style>