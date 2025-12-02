<template>
    <v-card class="item">
        <div class="title">
            <slot>

            </slot>
        </div>
        <v-btn class="btn">
            View Workout
        </v-btn>
    </v-card>
</template>

<script setup>

</script>

<style scoped>
    .item {
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
    }
</style>