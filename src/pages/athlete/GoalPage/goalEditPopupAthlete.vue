<template>
  <div v-if="show" class="modal-overlay" @click.self="closeDialog">
    <v-card class="modal">
      <v-form v-model="valid">
        <v-card-title class="title">Edit Goal</v-card-title>
        <div class="modal-content">
          <v-text-field
            v-model="name"
            class="name-input"
            label="Name"
            required
          ></v-text-field>

          <v-textarea
            v-model="description"
            class="description-input"
            label="Description"
            rows="4"
          ></v-textarea>

          <v-date-input
            v-model="date"
            label="Goal Date"
            class="date-input"
            prepend-icon="mdi-calendar"
          ></v-date-input>
        </div>
        <div class="buttons">
          <v-btn class="save-button" @click="submitGoal">Submit</v-btn>
          <v-btn class="delete-button" @click="closeDialog">Cancel</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { VDateInput } from "vuetify/labs/VDateInput";
import Goal from "../../../classes/Goal.js";
import { ref, toRef } from "vue";
import store from "../../../store/store.js";
import goalServices from "../../../services/goalServices.js";

const props = defineProps({
  show: Boolean,
  goal: Object,
  refresh: Function,
});
const emit = defineEmits(["update:show"]);

const goal = toRef(props, "goal");
const valid = ref(true);
const name = ref("");
const description = ref("");
const date = ref("");

function generateTextFields(goal) {
  name.value = goal.value.name;
  description.value = goal.value.description;
  date.value = goal.value.date;
}

generateTextFields(goal);

function closeDialog() {
  emit("update:show", false);
}

function submitGoal() {
  const newGoal = new Goal(
    name.value,
    description.value,
    date.value,
    store.getUser().id,
    goal.value.goalID
  );
  goalServices
    .update(newGoal)
    .then(() => {
      console.log("Updated Goal:", newGoal);
      if (props.refresh) props.refresh();
    })
    .catch((err) => {
      console.log(err);
    });
  closeDialog();
}
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

.modal {
  background-color: #ffffff;
  width: 50%;
  max-width: 90%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  will-change: auto !important;
  background-color: var(--color-primary);
  justify-content: center;
  justify-self: center;
  align-self: center;
}

.title {
  padding: 16px 24px;
}

.modal-content {
  width: 95%;
  padding: 24px;
  background-color: var(--color-primary);
  justify-content: center;
  justify-self: center;
  align-self: center;
}

.name-input {
  width: 20%;
}

.description-input {
  min-height: 100px;
}

.date-input {
  width: 20%;
  margin-bottom: 1rem;
  z-index: 1;
  will-change: auto !important;
}

.buttons {
  justify-content: right;
  margin: 0 12px 12px auto;
  display: flex;
  gap: 16px;
  padding-right: 12px;
}

.action-button {
  flex: 1;
  will-change: auto !important;
}

.save-button {
  background-color: var(--btn-primary);
  color: var(--btn-primary-text);
}

.delete-button {
  background-color: var(--color-text-secondary);
  color: var(--btn-primary-text);
}
</style>
