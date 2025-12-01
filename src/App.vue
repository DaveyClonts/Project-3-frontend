<template>
    <v-app>
        <topbar v-if="!route.meta.noNavigation">
            <navbar
                v-if="store.getUser().role == 'Coach'"
                :navItems="navCoach"
            />
            <navbar
                tab="/dashboardAthlete"
                v-if="store.getUser().role == 'Athlete'"
                :navItems="navAthlete"
            />
            <profileIcon />
        </topbar>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<style>
.logout {
    position: absolute;
    left: auto;
    right: 40px;
    top: 40px;
}
</style>

<script setup>
import store from "./store/store";
import navbar from "./components/navbar.vue";
import topbar from "./components/topbar.vue";
import profileIcon from "./components/profileIcon.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const navCoach = [
    { name: "dashboardCoach", label: "Dashboard", path: "/dashboardCoach" },
    { name: "workoutsCoach", label: "Workouts", path: "/workoutsCoach" },
    { name: "exercisesCoach", label: "Exercises", path: "/exercisesCoach" },
    { name: "athletesCoach", label: "Athletes", path: "/athletesCoach" },
];

const navAthlete = [
    { name: "dashboardAthlete", label: "Dashboard", path: "/dashboardAthlete" },
    { name: "workoutAthlete", label: "Workouts", path: "/workoutAthlete" },
    { name: "goalAthlete", label: "Goals", path: "/goalAthlete" },
];
</script>
