<template>
    <div class="navbar">
        <ul class="nav-list">
            <li
                v-for="item in navigation"
                :key="item.name"
                class="nav-item"
                @click="navigate(item)"
                :class="{ active: route.name === item.name }"
            >
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.navbar {
    height: 50px;
    border-radius: 50px;
    background-color: var(--color-primary);
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
    height: 45px;
    border-radius: 50px;
    padding: 0px 25px;
    cursor: pointer;
    color: var(--color-text-secondary);
    user-select: none; /* prevents highlighting navbar */
}

.nav-item.active {
    background-color: var(--color-secondary);
    color: var(--color-primary);
}

.nav-item:first-child {
    margin-left: 4px;
}

.nav-item:last-child {
    margin-right: 4px;
}
</style>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "../store/store";
import userRole from "../classes/userRole";
const route = useRoute();
const router = useRouter();

const navigation = ref([]);

const user = store.getUser();

if (user.role == userRole.Athlete)
    navigation.value = [
        {
            name: "dashboardAthlete",
            label: "Dashboard",
            path: "/dashboardAthlete",
        },
        {
            name: "workoutsAthlete",
            label: "Workouts",
            path: "/workoutsAthlete",
        },
        {
            name: "goalsAthlete",
            label: "Goals",
            path: "/goalsAthlete",
        },
    ];
else
    navigation.value = [
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
