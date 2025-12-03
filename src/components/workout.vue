<template>
    <v-card class="item">
        <div class="title">
            <slot>

            </slot>
        </div>
        <v-btn class="btn" @click="router.push('/workoutsCoach')">
            View Workout
        </v-btn>
    </v-card>
</template>

<script setup>
    import { useRouter } from 'vuetify/lib/composables/router.mjs';

    const router = useRouter();
</script>

<style scoped>

.item {
    height: 12vh;
    width: 12vw;
    min-width: 170px; /* ensures slide-group arrows ALWAYS appear */
    min-height: 120px;
    margin-top: 1vh;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1vh;
    background-color: var(--color-bg);
    overflow: visible;
}

.title {
    font-weight: 600;
    font-size: 20px;
}

.btn {
    background-color: var(--btn-primary);
    color: var(--btn-primary-text);
    border-radius: 40px;
    height: 3.5vh !important;
    width: 10vw;
    min-width: 120px; /* keep readable on laptops */
}

/* ---------------------------------------------
   🖥️ Laptop screens (1440px–1200px wide)
--------------------------------------------- */
@media (max-width: 1440px) {
    .item {
        width: 15vw;
        height: 14vh;
    }

    .title {
        font-size: 18px;
    }

    .btn {
        font-size: 14px;
        width: 12vw;
    }
}

/* ---------------------------------------------
   💻 Small laptops (1200px–900px wide)
--------------------------------------------- */
@media (max-width: 1200px) {
    .item {
        width: 18vw;
        height: 15vh;
    }

    .title {
        font-size: 16px;
    }

    .btn {
        font-size: 13px;
        width: 14vw;
        height: 4vh !important;
    }
}

/* ---------------------------------------------
   📱 Tablet width (900px and below)
--------------------------------------------- */
@media (max-width: 900px) {
    .item {
        width: 35vw;
        height: 20vh;
    }

    .title {
        font-size: 16px;
    }

    .btn {
        width: 30vw;
        height: 5vh !important;
        font-size: 14px;
    }
}


    /* .item {
        height: 12vh;
        width: 12vw;
        margin-top: 1vh;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1vh;
        background-color: var(--color-bg);
    }

    .title {
        font-weight: 600;
        font-size: 20px;
    }

    @media (max-width: 1200px) and (max-height: 900px) {
        .title {
            font-weight: 600;
            font-size: 16px;
        }

        .btn {
            font-size: 12px;
        }
    }

    .btn {
        background-color: var(--btn-primary);
        color: var(--btn-primary-text);
        border-radius: 40px;
        height: 3.5vh !important;
        width: 10vw;
    } */
</style>