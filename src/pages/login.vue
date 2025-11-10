<script setup>
import socialLogin from "../components/socialLogin.vue";
import authServices from "../services/authServices.js";
import store from "../store/store.js";

function logout() {
    const user = store.replaceState.getLoginUserInfo;

    if (user == null) {
        console.log("User is null!");
        return;
    }

    await authServices.logoutUser(user.token)
    .then(response => {
        console.log(`Successfully logged out user: ${response}.`);
    })
    .catch(err => {
        console.log(`Error logging out user: ${err}.`);
    });
}
</script>

<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="login-card">
            <v-card-text class="title">Get Started!</v-card-text>
            <v-col class="d-flex flex-column align-center" style="gap: 20px">
                <social-login />
                <v-btn class="button" variant="tonal" @click="logout"
                    >Logout</v-btn
                >
            </v-col>
        </v-card>
    </v-container>
</template>

<style scoped>
.login-card {
    background-color: #f2f2f2;
    text-align: center;
    width: 30%;
    height: 50%;
    border-radius: 40px;
}

.title {
    padding-top: 40%;
    font-size: 26px;
    font-weight: 600;
}

.button {
    width: 300px;
}
</style>
