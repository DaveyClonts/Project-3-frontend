<template>
    <v-card class="top-container rounded-xl">
        <v-data-table :headers="headers" :items="athletes" hide-default-footer>
            <template v-slot:item.owned="{ item }">
                <v-checkbox-btn class="toggle-button" v-model="item.owned"> </v-checkbox-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<style>
.top-container {
    margin-top: 8px;
    width: 500px;
    padding: 20px;
    height: 80vh;
    background-color: var(--color-primary);
    justify-content: center;
    justify-self: center;
}

.toggle-button {
    color: var(--btn-primary);
}
</style>

<script setup>
import { ref } from "vue";
import userRole from "../../classes/userRole";
import userServices from "../../services/userServices";

const athletes = ref([]);

const headers = [
    {
        title: "Name",
        key: "name",
        value: (item) => `${item.firstName} ${item.lastName}`,
    },
    {
        title: "Owned",
        key: "owned",
    },
];

userServices.getAllWithRole(userRole.Athlete).then((users) => {
    athletes.value = users;
});
</script>
