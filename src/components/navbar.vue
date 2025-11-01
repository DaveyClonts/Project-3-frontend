<template>
    <div class="navbar-container">
        <div class="navbar">
            <ul class="nav-list">
                <li
                    v-for="item in navItems"
                    :key="item.name"
                    class="nav-item"
                    @click="navigate(item)"
                    :class="{ active: route.name === item.name }"
                >
                    {{ item.label }}
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
    list-style: none;
}

.nav-item {
    display: flex;
    align-items: center;
    font-size: 20px;
    height: 50px;
    border-radius: 50px;
    padding: 0px 25px;
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
import { useRouter, useRoute} from 'vue-router';
const route = useRoute();
const router = useRouter();

const navItems = [
    { name: "dashboardCoach", label: "Dashboard", path: "/dashboardCoach" },
    { name: "workoutsCoach", label: "Workouts", path: "/workoutsCoach" },
    { name: "exercisesCoach", label: "Exercises", path: "/exercisesCoach" },
    { name: "athletesCoach", label: "Athletes", path: "/athletesCoach" },
];

// push the route to the router if that part of the navbar is active
const navigate = (item) => {
    if (route.name !== item.name) {
        router.push(item.path);
    }
};
</script>
