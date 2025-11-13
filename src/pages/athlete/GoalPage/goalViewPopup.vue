<template>
    <div v-if="showDialog" class="modal-overlay" @click.self="closeDialog">
        <v-card class="modal">
            <h3>View Goal</h3>

            <v-text-field
                :model-value="goal.name || 'N/A'"
                label="Goal Name"
                readonly
            />
            <v-text-field
                :model-value="goal.description || 'N/A'"
                label="Description"
                readonly
            />
            <v-text-field
                :model-value="goal.dueDate || 'N/A'"
                label="Goal Date"
                readonly
            />

            <v-list>
                <v-list-item
                    v-for="note in notesList"
                    :key="note.id"
                    class="note-item"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{
                            note.note
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                            note.date
                        }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-textarea
                v-model="newNote"
                label="Add a new progress note"
                rows="2"
            ></v-textarea>
            <v-btn @click="addNote">Add Note</v-btn>

            <div class="buttons">
                <v-btn class="action-button">
                    <GoalDeleteButton :goal="goalID" />
                </v-btn>

                <v-btn class="action-button">
                    <GoalEditButton :goal="goalID" />
                </v-btn>

                <v-btn class="action-button">
                    <button @click="closeDialog">Close</button>
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script setup>
import { toRef, ref } from "vue";
import GoalDeleteButton from "./goalDeleteButtonAthlete.vue";
import GoalEditButton from "./goalEditButtonAthlete.vue";
import Note from "../../../classes/Note.js"
import goalServices from "../../../services/goalServices.js";

const props = defineProps({
    show: Boolean,
    goal: Object
});

console.log(props.goal);

const emit = defineEmits(["update:show"]);

const showDialog = toRef(props, "show");

const notesList = ref([]);
const newNote = ref("")

function closeDialog() {
    emit("update:show", false);
}

function addNote() {
    if (!newNote.value.trim()) return;

    props.goal.notes.push(new Note(newNote.value));
    console.log(props.goal);
    newNote.value = "";

    getNotes();
}

function getNotes() {
    notesList.value = props.goal.notes;
}

getNotes();

const editGoal = () => {
    console.log("Edit goal:", props.goal);
    closeDialog();
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1000;
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
}
.buttons {
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    padding: 2;
    width: 20%;
}

.action-button {
    flex: 1;
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
</style>
