<template>
    <v-card class="top-container rounded-xl">
        <v-data-table :headers="headers" :items="athletes" hide-default-footer>
            <template v-slot:item.owned="{ item }">
                <v-checkbox-btn
                    class="toggle-button"
                    v-model="item.owned"
                    @click="toggleOwnership(item)"
                >
                </v-checkbox-btn>
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
import UserRole from "../../classes/UserRole.js";
import userServices from "../../services/userServices.js";
import store from "../../store/store.js";

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
        value: "item.owned",
    },
];

let ownedAthletes = null;

userServices
    .getAthletesForCoach(store.getUser().id)
    .then((databaseAthletes) => {
        ownedAthletes = databaseAthletes.map((a) => a.id);

        userServices.getAllWithRole(UserRole.Athlete).then((users) => {
            athletes.value = users;

            athletes.value.forEach((a) => {
                a.owned = ownedAthletes.includes(a.id);
            });
        });
    });

function toggleOwnership(athlete) {
    if (athlete.owned) {
        userServices.releaseAthlete(athlete.id);
    } else {
        userServices.reserveAthlete(athlete.id);
    }
}
</script>
