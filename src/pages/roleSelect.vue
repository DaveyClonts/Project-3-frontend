<script setup>
import store from "../store/store.js";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import userServices from "../services/userServices.js";
import UserRole from "../classes/userRole.js";

const router = useRouter();

function selectAthlete() {
    let user = store.getUser();
    user.role = UserRole.Athlete;

    userServices
        .update(user)
        .then(() => {
            store.setUser(user);
            router.push({ name: "dashboardAthlete" });
        })
        .catch((err) => {
            console.error("Error selecting role: " + err);
        });
}

function selectCoach() {
    let user = store.getUser();
    user.role = UserRole.Coach;

    userServices
        .update(user)
        .then(() => {
            store.setUser(user);
            router.push({ name: "workoutsCoach" });
        })
        .catch((err) => {
            console.error("Error selecting role: " + err);
        });
}
</script>

<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <div class="login-card">
            <v-card-text class="title">Select Role</v-card-text>
            <v-col class="d-flex flex-column align-center" style="gap: 20px">
                <v-btn @click="selectAthlete">Athlete</v-btn>
                <v-btn @click="selectCoach">Coach</v-btn>
            </v-col>
        </div>
    </v-container>
</template>

<style scoped>
.login-card {
    background-color: transparent;
    text-align: center;
    width: 30%;
    height: 50%;
    border-radius: 40px;
}

.title {
    padding-top: 20%;
    font-size: 26px;
    font-weight: 600;
}

.button {
    width: 300px;
}
</style>
