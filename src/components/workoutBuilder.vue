<template>
    <v-card class="builder-container rounded-xl">
        <div class="subcontainer right-outline">
            <div class="title">Exercise List</div>
            <exerciseSelector />
            <exerciseSelector />
            <exerciseSelector />
            <exerciseSelector />
            <exerciseSelector />
            <exerciseSelector />
            <exerciseSelector />
            <exerciseSelector />
            <exerciseSelector />
            <exerciseSelector />
            <exerciseSelector />
            <exerciseSelector />
        </div>
        <div class="subcontainer">
            <div class="title">Selected Exercises</div>
        </div>
    </v-card>
</template>

<style scoped>
.builder-container {
    margin-left: 25%;
    margin-right: 25%;
    min-width: 850px;
    padding: 20px;
    height: 80vh;
    background-color: #d0d0d0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-self: center;
}

.subcontainer {
    width: 50%;
    gap: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto scroll;
    overflow-y: auto;
}

.right-outline {
    border-width: 0px 2px 0px 0px;
    border-color: rgb(82, 82, 82);
    border-style: solid;
}

.title {
    border-width: 0px 0px 2px 0px;
    border-color: rgb(82, 82, 82);
    border-style: solid;
    font-size: 20px;
    text-align: center;
    margin-top: 6px;
    padding-bottom: 12px;
    width: 100%;
}
</style>

<script setup>
import exerciseSelector from "./exerciseSelector.vue";

const props = defineProps(["workout"]);
</script>
