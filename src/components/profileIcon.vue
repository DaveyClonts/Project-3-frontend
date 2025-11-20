<template>
    <v-btn icon class="profile-icon" @click="toggled = true">
        <v-icon>mdi-account</v-icon>
    </v-btn>


    <!-- if this gets bigger lets put this in a SFC (davey) -->
    <v-dialog v-model="toggled" width="30vw" height="30vh">
        <v-card class="popup">
            <div class="popup">
                <div class="centered-column">
                    <div class="popup-title">Coach Jones</div>
                    <v-btn class="logout-button" variant="tonal">Logout</v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

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

<script setup>
import { ref } from "vue";
const toggled = ref(false);

</script>
