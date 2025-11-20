<template>
  <div v-if="show" class="modal-overlay" @click.self="closeDialog">
    <v-card class="modal">
      <v-form v-model="valid">
        <div class="title">Add Goal</div>

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

        <div class="button-container">
          <v-btn class="save-button" @click="submitGoal">Save</v-btn>
          <v-btn class="cancel-button" @click="closeDialog">Cancel</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { VDateInput } from "vuetify/labs/VDateInput";
import { ref } from "vue";
import goalServices from "../../../services/goalServices";
import store from "../../../store/store";

const props = defineProps({
  show: Boolean,
  refresh: Function,
});
const emit = defineEmits(["update:show"]);

const valid = ref(true);
const name = ref("");
const description = ref("");
const date = ref("");

function closeDialog() {
  name.value = "";
  description.value = "";
  date.value = "";
  emit("update:show", false);
}

function submitGoal() {
  if (!name.value || !date.value) {
    alert("Please fill in Name and Due Date.");
    return;
  }

  const goal = {
    name: name.value,
    description: description.value,
    date: date.value,
    userID: store.getUser().id,
  };
  goalServices
    .create(goal)
    .then(() => {
      console.log("Submitted Goal:", goal);
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
  z-index: 1;
}

.modal {
  background-color: #ffffff;
  border-radius: 40px;
  padding: 2rem;
  width: 80%;
  max-width: 50%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.title{
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 16px ;
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
}

.button-container {
  margin: 0 12px 12px auto;
  display: flex;
  gap: 16px;
}

.action-button {
  flex: 1;
}

.save-button {
  background-color: var(--btn-primary);
  color: var(--btn-primary-text);
}

.cancel-button {
  background-color: var(--color-text-secondary);
  color: var(--btn-primary-text);
}
</style>
