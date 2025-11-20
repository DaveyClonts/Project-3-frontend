<template>
    <v-card class="selector-container rounded-xl">
        <div class="selector-subcontainer">
            <div>
                <div class="selector-title">{{ exercise.name }}</div>
                <div class="selector-subtitle">{{ exercise.type }}</div>
            </div>
            <v-btn
                class="select-button rounded-xl"
                variant="text"
                :ripple="{ class: 'text-white' }"
                @click="$emit('exercise-selected', exercise)"
                >+</v-btn
            >
        </div>
    </v-card>
</template>

<style scoped>
.selector-container {
    background-color: #848484;
    height: 80px;
    width: 100%;
    padding: 12px 24px 8px 24px;
    flex: 0 0 auto;
}

.selector-subcontainer {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.select-button {
    height: 150% !important;
    width: 40px;
    margin-left: auto;
    margin-right: -24px;
    align-self: center;
    color: white;
    font-size: 24px;
}

.selector-title {
    font-size: 20px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.selector-subtitle {
    font-size: 16px;
    color: whitesmoke;
    margin-top: -2px;
    margin-left: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

<script setup>
const props = defineProps(["exercise"]);
</script>