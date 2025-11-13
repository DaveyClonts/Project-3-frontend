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
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const user = ref({});
const router = useRouter();

onMounted(() => {
    loginWithGoogle();
});

async function loginWithGoogle() {
    const client = import.meta.env.VITE_APP_CLIENT_ID;

    global.handleCredentialResponse = handleCredentialResponse;
    global.google.accounts.id.initialize({
        client_id: client,
        cancel_on_tap_outside: false,
        auto_select: true,
        callback: global.handleCredentialResponse,
    });

    global.google.accounts.id.renderButton(
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
                token
            );

            console.log("Successfully logged in.");
            store.commit("setLoginUser", user);
            router.push("/dashboardCoach");
        })
        .catch((err) => {
            console.error(`Error with authentication: ${err}.`);
        });
}
</script>
