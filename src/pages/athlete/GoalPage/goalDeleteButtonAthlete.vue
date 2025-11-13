<template>
  <div>
    <button @click="showDeleteGoalPopup = true">Delete</button>

    <DeleteGoalPopup
      v-model:show="showDeleteGoalPopup"
      :course="course"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DeleteGoalPopup from './goalDeletePopupAthlete.vue';

const showDeleteGoalPopup = ref(false)

const props = defineProps({
  goalID: {
    type: Number,
  }
});

</script>

<style scoped>
.buttons {
  margin-top: 1rem;
  text-align: right;
}
</style>