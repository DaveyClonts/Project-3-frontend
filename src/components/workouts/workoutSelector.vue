<template>
    <v-card class="selector-container rounded-xl">
        <div class="selector-subcontainer">
            <div>
                <div class="selector-title">{{ $props.workout.name }}</div>
                <div class="selector-subtitle">{{ $props.workout.date }}</div>
            </div>
            <div class="selector-button-container">
                <v-btn
                    class="select-button"
                    variant="text"
                    @click="$emit('workout-selected', workout)"
                    >Edit</v-btn
                >
                <v-btn
                    class="delete-button"
                    variant="text"
                    @click="$emit('workout-deleted', workout)"
                    >Delete</v-btn
                >
            </div>
        </div>
    </v-card>
</template>

<style scoped>
.selector-container {
    background-color: var(--btn-secondary);
    height: 80px;
    width: 380px;
    padding: 12px 24px 8px 24px;
    flex: 0 0 auto;
}

.selector-subcontainer {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.selector-button-container {
    height: 150%;
    width: 80px;
    min-width: 64px;
    margin-left: auto;
    margin-right: -8px;
    padding-left: 8px;
    align-self: center;
    justify-content: center;
    align-content: center;
}

.delete-button {
    height: 40% !important;
    width: 100%;
    min-width: 100%;
    color: var(--btn-primary);
    font-size: 16px;
}

.select-button {
    height: 40% !important;
    width: 100%;
    color: var(--btn-primary);
    min-width: 100%;
    font-size: 16px;
}

.selector-title {
    font-size: 20px;
    color: var(--color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.selector-subtitle {
    font-size: 16px;
    color: var(--color-text-secondary);
    margin-top: -2px;
    margin-left: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

<script setup>
const props = defineProps(["workout"]);
</script>
