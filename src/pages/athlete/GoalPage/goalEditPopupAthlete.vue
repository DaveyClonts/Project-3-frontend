<template>
    <div v-if="show" class="modal-overlay" @click.self="closeDialog">
        <v-card class="modal">
            <v-form v-model="valid">
                <h3 class="mb-4 text-center">Edit Goal</h3>

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

                <div class="buttons">
                    <v-btn class="action-button" @click="submitGoal"
                        >Submit</v-btn
                    >
                    <v-btn class="action-button" @click="closeDialog"
                        >Cancel</v-btn
                    >
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script setup>
import { VDateInput } from "vuetify/labs/VDateInput";
import Goal from "../../../classes/Goal.js"
import { ref } from "vue";

const props = defineProps({
    show: Boolean,
    goalID:{
        type: Number,
    }
});
const emit = defineEmits(["update:show"]);

const valid = ref(true);
const name = ref("");
const description = ref("");
const date = ref("");


//FIX THIS WHEN BACKEND
function generateTextFields(goalID){
    const newGoal = new Goal("New", "New", "New");
    const goal = newGoal;
    name.value = goal.name;
    description.value = goal.description;
    date.value = goal.date;
}

generateTextFields(props.goalID);

function closeDialog() {
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
        dueDate: date.value,
    };

    console.log("Submitted Goal:", goal);
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
