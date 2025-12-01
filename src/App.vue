<template>
    <v-app>
        <topbar v-if="!route.meta.noNavigation">
            <navbar/>
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
import navbar from "./components/navbar.vue";
import topbar from "./components/topbar.vue";
import profileIcon from "./components/profileIcon.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
