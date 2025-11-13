<template>
    <div>
        <div v-if="showDialog" class="modal-overlay" @click.self="closeDialog">
            <v-card class="modal">
                <h3>Are you sure you wish to delete goal {{ goal }}</h3>
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
//import goalServices from "../services/goalServices.js";

const props = defineProps({
    show: Boolean,
    goal: {
        type: Number,
    },
});

const emit = defineEmits(["update:show", "goal"]);

const showDialog = toRef(props, "show");

function closeDialog() {
    emit("update:show");
    location.reload();
}

function confirmDelete() {
    //goalServices.delete(props.goal);
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
