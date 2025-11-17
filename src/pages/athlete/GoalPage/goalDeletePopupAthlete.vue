<template>
    <div>
        <div v-if="showDialog" class="modal-overlay" @click.self="closeDialog">
            <v-card class="modal">
                <h3>Are you sure you wish to delete goal {{ goal.name }}</h3>
                <div class="buttons">
                    <v-btn class="action-button">
                        <button @click="confirmDelete">Delete</button>
                    </v-btn>
                    <v-btn class="action-button">
                        <button @click="closeDialog">Cancel</button>
                    </v-btn>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script setup>
import { toRef } from "vue";
import goalServices from "../../../services/goalServices";

const props = defineProps({
    show: Boolean,
    goal: Object,
    refresh: Function
});

const goal = toRef(props, "goal");

const emit = defineEmits(["update:show", "goal", "closeParentPopup"]);

const showDialog = toRef(props, "show");

function closeDialog() {
    if (props.refresh) props.refresh();
    emit("update:show", false);
    emit("closeParentPopup");
}

function confirmDelete() {
    console.log(goal.value.goalID);
    goalServices.delete(goal.value.goalID).then(() =>{
        console.log("Deleted Goal:", goal);
        closeDialog();
    })
    .catch((err) => {
        console.log(err);
    })
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
    z-index: 2;
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
