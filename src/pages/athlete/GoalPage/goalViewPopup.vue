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
                    v-for="note in goal.notes"
                    :key="note.id"
                    class="note-item"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{
                            note.content
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
import { toRef } from "vue";
import GoalDeleteButton from "./goalDeleteButtonAthlete.vue";
import GoalEditButton from "./goalEditButtonAthlete.vue";
import goalServices from "../../../services/goalServices.js";

const props = defineProps({
    show: Boolean,
    goal: Object,
});

console.log(props.goal);

const goalID = props.goal.goalID;

const emit = defineEmits(["update:show"]);

const showDialog = toRef(props, "show");

const closeDialog = () => {
    emit("update:show", false);
};

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
</style>
