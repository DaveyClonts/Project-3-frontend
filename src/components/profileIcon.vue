<template>
    <v-btn icon class="profile-icon" @click="toggled = true">
        <v-icon>mdi-account</v-icon>
    </v-btn>


    <!-- if this gets bigger lets put this in a SFC (davey) -->
    <v-dialog v-model="toggled" width="30vw" height="30vh">
        <v-card class="popup">
            <div class="centered-column">
                <div class="popup-title">{{ user.getFullName() }}</div>
                <v-btn @click="logout" class="logout-button" variant="tonal">Logout</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import User from "../classes/User";
import store from "../store/store";
import authServices from "../services/authServices";
import { useRouter } from 'vue-router';

const router = useRouter();
const toggled = ref(false);

const user = new User( 
    store.getUser().firstName,
    store.getUser().lastName,
    store.getUser().token,
);

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

<style scoped>
.profile-icon {
    position: absolute;
    right: 3vw;
    background-color: var(--color-primary);
}


/* poup css starts here */
.centered-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.popup {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px !important;
    background-color: var(--color-primary);
}

.popup-title {
    font-size: 30px;
    font-weight: 600;
}

.logout-button {
    background-color: var(--btn-secondary);
    color: var(--btn-secondary-text);
    border-radius: 40px !important;
}
</style>
