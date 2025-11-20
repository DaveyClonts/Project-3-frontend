<template>
  <div
    v-if="showWorkoutViewPopup"
    class="modal-overlay"
    @click.self="closeDialog"
  >
      <v-card class="builder-container rounded-xl">
        <div class="subcontainer right-outline">
          <div class="title">Exercise List</div>
          <ExerciseDisplay v-for="exercise in exercise" :key="workout.id" :workout="workout" />
        </div>
        <div class="subcontainer">
          <div class="title">Exercise</div>
        </div>
    </v-card>
  </div>
</template>

<script setup>
import { toRef } from "vue";

const props = defineProps({
  show: Boolean,
  workout: Object,
  getAll: Function,
});

const emit = defineEmits(["update:show", "closeParentPopup"]);

const showWorkoutViewPopup = toRef(props, "show");
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  will-change: auto !important;
}

.builder-container {
    margin-left: 25%;
    margin-right: 25%;
    min-width: 850px;
    padding: 20px;
    height: 80vh;
    background-color: #d0d0d0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-self: center;
}

.subcontainer {
    width: 50%;
    gap: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto scroll;
    overflow-y: auto;
}

.modal {
  background-color: #ffffff;
  border-radius: 40px;
  padding: 2rem;
  width: 80%;
  max-width: 90%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  will-change: auto !important;
}

.buttons {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  padding: 2;
  width: 20%;
  will-change: auto !important;
}

.action-button {
  flex: 1;
}

.right-outline {
    border-width: 0px 2px 0px 0px;
    border-color: rgb(82, 82, 82);
    border-style: solid;
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
