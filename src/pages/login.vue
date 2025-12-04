<script setup>
import UserRole from "../classes/UserRole.js";
import socialLogin from "../components/login/socialLogin.vue";
import store from "../store/store.js";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
    console.log("Login mounted");
    let user = store.getUser();

    if (user != null && user.token != null && user.token != "") {
        if (user.role == UserRole.Athlete)
            router.push({ name: "dashboardAthlete" });
        else if (user.role == UserRole.Coach)
            router.push({ name: "dashboardCoach" });
        else if (user.role == UserRole.Admin)
            router.push({ name: "usersAdmin" });
    }
});
</script>

<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <div class="login-card">
            <v-card-text class="title">Get Started!</v-card-text>
            <v-col class="d-flex flex-column align-center" style="gap: 20px">
                <social-login />
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
