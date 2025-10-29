<template>
    <div class="navbar-container">
        <div class="navbar">
            <ul class="nav-list">
                <li
                    class="nav-item"
                    @click="tab = 'Dashboard'"
                    :class="{ active: tab === 'Dashboard' }"
                >
                    Dashboard
                </li>
                <li
                    class="nav-item"
                    @click="tab = 'Workouts'"
                    :class="{ active: tab === 'Workouts' }"
                >
                    Workouts
                </li>
                <li
                    class="nav-item"
                    @click="tab = 'Exercises'"
                    :class="{ active: tab === 'Exercises' }"
                >
                    Exercises
                </li>
                <li
                    class="nav-item"
                    @click="tab = 'Athletes'"
                    :class="{ active: tab === 'Athletes' }"
                >
                    Athletes
                </li>
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
    background-color: #d0d0d0;
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
    cursor: pointer;
}

.nav-item.active {
    background-color: #848484;
}

.nav-item:first-child {
    margin-left: 6px;
}

.nav-item:last-child {
    margin-right: 6px;
}
</style>

<script setup>
import { ref } from "vue";

const props = defineProps({
    tab: String,
});
</script>
