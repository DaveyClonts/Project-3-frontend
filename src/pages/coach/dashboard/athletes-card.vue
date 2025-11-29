<template>
    <v-card class="athletes-card">
        <div class="title">Your Athletes</div>
        <div class="column">

            <athlete v-for="athlete in athletes"> 
                {{ athlete.getFullName() }}
            </athlete>

            <addButton/>
        </div>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import athlete from '../../../components/athlete.vue';
import addButton from '../../../components/editButton.vue';
import userServices from '../../../services/userServices';

const athletes = ref([]);

onMounted(async () => {
    athletes.value = await userServices.getAthletesForCoach(1);
});
</script>

<style scoped>
.athletes-card {
    width: 22vw;
    height: 78vh;
    border-radius: 20px;
    padding: 20px;
}

.column {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.title {
    font-size: 25px;
    font-weight: 600;
    padding-bottom: 10px;
}
</style>