<template>
  <div v-if="showDialog" class="modal-overlay" @click.self="closeDialog">
    <v-card class="goal-modal">
      <v-card-title class="title">View Goal</v-card-title>
      <div class="modal-content">
        <v-text-field
        v-model="name"
          label="Goal Name"
        />
        <v-text-field
        v-model="description"
          label="Description"
        />
        <v-date-input
            v-model="date"
            label="Goal Date"
            class="date-input"
            prepend-icon="mdi-calendar"
          ></v-date-input>

        <v-list>
          <v-list-item
            v-for="note in notesList"
            :key="note.id"
            class="note-item"
          >
            <v-list-item-content>
              <v-list-item-title>{{ note.note }}</v-list-item-title>
              <v-list-item-subtitle>{{ note.date }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-textarea
          v-model="newNote"
          label="Add a new progress note"
          rows="2"
        ></v-textarea>
        <v-btn @click="addNote">Add Note</v-btn>
      </div>
      <div class="buttons">
        <v-btn @click="submitGoal" class="save-button">Save</v-btn>
        <GoalDeleteButton
          :goal="goal"
          :refresh="refresh"
          @closeParentPopup="closeDialog"
        />
        <v-btn @click="closeDialog">Close</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { toRef, ref, watch } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";
import GoalDeleteButton from "./goalDeleteButtonAthlete.vue";
import goalServices from "../../../services/goalServices.js";
import Goal from "../../../classes/Goal.js";
import Note from "../../../classes/Note.js";
import noteServices from "../../../services/noteServices.js";

const props = defineProps({
  show: Boolean,
  goal: Object,
  refresh: Function,
});

const emit = defineEmits(["update:show", "closeParentPopup"]);

const showDialog = toRef(props, "show");

const notesList = ref([]);
const newNote = ref("");

const name = ref("");
const description = ref("");
const date = ref("");

watch(
  [showDialog, () => props.goal],
  ([show, goal]) => {
    if (show && goal) {
      name.value = goal.name || "";
      description.value = goal.description || "";
      date.value = goal.date || "";
      getNotes();
    }
  },
  { immediate: true }
);

function closeDialog() {
  emit("update:show", false);
}

async function addNote() {
  if (!newNote.value.trim()) return;
  await noteServices.create(new Note(newNote.value, props.goal.id));
  newNote.value = "";
  getNotes();
}

async function getNotes() {
  notesList.value = await noteServices.getAll(props.goal.id);
}

function submitGoal() {
  const newGoal = new Goal(
    name.value,
    description.value,
    date.value,
    props.goal.userID,
    props.goal.id
  );
  console.log(newGoal);

  goalServices
    .update(newGoal)
    .then(() => {
      console.log("Updated Goal:", newGoal);
      Object.assign(props.goal, {
      name: newGoal.name,
      description: newGoal.description,
      date: new Date(newGoal.date).toISOString().split("T")[0], 
    });
      if (props.refresh) props.refresh();
    })
    .catch((err) => console.log(err));
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

.goal-modal {
  width: 60%;
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

.buttons {
  justify-content: right;
  margin: 0 12px 12px auto;
  display: flex;
  gap: 16px;
  padding-right: 12px;
}

.edit-button {
  background-color: var(--btn-primary);
  color: var(--btn-primary-text);
}

.note-item {
  white-space: normal;
}

.note-item .v-list-item-title,
.note-item .v-list-item-subtitle {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  display: block !important;
}

.date-input {
  width: 20%;
  margin-bottom: 1rem;
  z-index: 1;
  will-change: auto !important;
}

.save-button {
  background-color: var(--btn-primary);
  color: var(--btn-primary-text);
}
</style>
