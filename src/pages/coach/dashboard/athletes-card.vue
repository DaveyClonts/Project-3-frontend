<template>
    <v-card class="athletes-card">
        <div class="title">Your Athletes</div>
        <div class="column">
            <athlete/>
            <athlete/>
            <addButton/>
        </div>
    </v-card>
</template>

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

<script setup>
import athlete from '../../../components/athlete.vue';
import addButton from '../../../components/addButton.vue';
import userServices from '../../../services/userServices';

const data = userServices.getAllWithRole("Athlete");

console.log(data);

</script>