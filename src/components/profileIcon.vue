<template>
    <v-btn icon class="profile-icon" @click="toggled = true">
        <v-icon>mdi-account</v-icon>
    </v-btn>


    <!-- if this gets bigger lets put this in a SFC (davey) -->
    <v-dialog v-model="toggled" width="30vw" height="30vh" >
        <v-card class="popup">
            <div class="centered-column">
                <div class="popup-title">{{ user.getFullName() }}</div>
                <v-btn class="logout-button" variant="tonal">Logout</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import User from "../classes/User";
import store from "../store/store";
const toggled = ref(false);

const user = new User( 
    store.getUser().firstName,
    store.getUser().lastName,
    store.getUser().token,
);

</script>

<style scoped>
.profile-icon {
    position: absolute;
    right: 3vw;
    background-color: #d0d0d0;
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
}

.popup-title {
    font-size: 30px;
    font-weight: 600;
}
</style>
