<template>
    <v-dialog width="30vw" height="45vh" eager>
        <v-card class="card" style="display: flex">
            <div class="centered-column">
                <v-card class="item" v-for="athlete in availableAthletes">
                    <div class="row">
                        <div class="checkbox">
                            <v-checkbox-btn></v-checkbox-btn>
                        </div>
                            
                        <div class="name">
                            {{ athlete.getFullName() }}
                        </div>
                    </div>
                </v-card>

                <v-btn class="confirm-button">
                    Confirm
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import userServices from "../services/userServices";

const availableAthletes = ref([]);

onMounted(async () => {
    availableAthletes.value = await userServices.getAllWithRole("athlete");
    console.log(availableAthletes.value);
});
</script>

<style scoped>
.centered-column {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 20px;
}

.card {
    border-radius: 40px !important;
    justify-content: center;
    align-items: center;
}

.item {
    background-color: var(--color-bg);
    width: 20vw;
    height: 5vh;
    border-radius: 30px;
    display: flex;
    align-items: center;
    padding-left: 5px;
}

.row {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.checkbox {
    /* background-color: var(--color-primary);
    width: 2.75vw;
    height: 4vh;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center; */
}

.name {
    color: var(--color-text-primary);
    padding-left: 2vw;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
}

.confirm-button {
    background-color: var(--btn-secondary);
    color: var(--btn-secondary-text);
    border-radius: 40px;
    min-width: 5vh;
    height: 5vh;
}
</style>
