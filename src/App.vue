<template>
    <v-app>
        <topbar v-if="user">
            <navbar v-if="!route.meta.noNavigation && user && user.role == 'Coach'" />
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
import { ref } from "vue";
import store from "./store/store";
import navbar from "./components/navbar.vue";
import topbar from "./components/topbar.vue";
import profileIcon from "./components/profileIcon.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const user = ref(store.getUser());
</script>
