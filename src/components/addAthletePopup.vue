<template>
    <v-dialog width="30vw" height="45vh" eager>
        <v-card class="card" style="display: flex;">
            <div class="centered-column">
                <ul>
                    <li v-for="athlete in availableAthletes">{{athlete.getFullName()}}</li>
                </ul>
            </div>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue';

import userServices from '../services/userServices';

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
}
</style>