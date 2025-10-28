<!-- This navbar will need to go outside of the router view in app.vue
this is so that animations for the navbar can happen while the content of the page refreshes  -->

<template>
    <div class="navbar-container">
        <div class="navbar">
            <ul class="nav-list">
                <li class="nav-item">Dashboard</li>
                <li class="nav-item">Workouts</li>
                <li class="nav-item">Exercises</li>
                <li class="nav-item">Athletes</li>
            </ul>
        </div>
    </div>
</template>

<style>
    .navbar-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 15vh;
    }

    .navbar {
        height: 60px;
        border-radius: 50px;
        background-color: #848484;
        display: flex;
        align-items: center;
    }

    .nav-list {
        display: flex;
        gap: 25px;
        list-style: none;
    }

    .nav-item {
        display: flex;
        align-items: center;
        font-size: 20px;
        height: 50px;
        border-radius: 50px;
        padding: 0px 20px;
    }

    .nav-item:first-child {
        margin-left: 6px;
    }

    .nav-item:last-child {
        margin-right: 6px;
    }

</style>

<script setup>
import { ref } from 'vue';
const tab = ref(null);


</script>