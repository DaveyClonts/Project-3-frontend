<template>
    <v-btn variant="plain" @click="logout">Logout</v-btn>
</template>

<style>
.v-btn {
    width: 70px;
}
</style>

<script setup>
import authServices from "../services/authServices.js";
import store from "../store/store.js";
import { useRouter } from 'vue-router';

const router = useRouter();

function logout() {
    console.log("Log out.");

    const user = store.getUser();

    if (user == null) {
        console.log("User is null!");
        return;
    }

    authServices
        .logoutUser(user.token)
        .then((response) => {
            console.log(
                `Successfully logged out user: ${response.data.message}`
            );
            
            store.clearUser();
            router.push({ name: "login" });
        })
        .catch((err) => {
            console.log(`Error logging out user: ${err}.`);
        });
}
</script>
