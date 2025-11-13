<template>
    <div class="signup-buttons">
        <v-row justify="center">
            <div id="parent_id" display="flex"></div>
        </v-row>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import authServices from "../services/authServices";
import User from "../classes/User";
import store from "../store/store.js";
import { useRouter } from "vue-router";

const user = ref({});
const router = useRouter();

onMounted(() => {
    loginWithGoogle();
});

async function loginWithGoogle() {
    const client = import.meta.env.VITE_APP_CLIENT_ID;

    window.handleCredentialResponse = handleCredentialResponse;
    window.google.accounts.id.initialize({
        client_id: client,
        cancel_on_tap_outside: false,
        auto_select: true,
        callback: window.handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
        document.getElementById("parent_id"),
        {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signup_with",
            width: 300,
            height: 200
        }
    );
}

async function handleCredentialResponse(response) {
    const token = {
        credential: response.credential,
    };

    authServices
        .loginUser(token)
        .then((response) => {
            user.value = new User(
                response.data.firstName,
                response.data.lastName,
                token,
                response.data.id
            );

            console.log("Successfully logged in.");
            store.setUser(user.value);
            router.push({ name: "dashboardCoach" });
        })
        .catch((err) => {
            console.error(`Error with authentication: ${err}.`);
        });
}
</script>
