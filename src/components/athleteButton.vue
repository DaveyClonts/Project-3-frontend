<template>
    <v-btn
        @click="router.push('/athletesCoach')"
        variant="tonal"
        class="button"
    >
        <slot>

        </slot>
    </v-btn>
</template>

<style scoped>
.button {
    background-color: var(--btn-secondary);
    color: var(--btn-secondary-text);
    border-radius: 40px;
    min-width: 5vh;
    height: 5vh;
}
</style>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
