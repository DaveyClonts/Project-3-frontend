<script setup>
import socialLogin from "../components/socialLogin.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

onMounted(() => {
    console.log("Component has been mounted!");
    let user = store.getters.getLoginUser;
    console.log("store: " + JSON.stringify(store));
    console.log("user: " + user);

    if (user != null && user.token != null && user.token != "")
        router.push("/dashboardCoach");
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
