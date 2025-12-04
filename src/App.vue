<template>
    <v-app>
        <topbar v-if="user != null">
            <navbar v-if="!$route.meta.noNavigation && user != null" />
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
import router from "./router.js";

const user = ref(store.getUser());

router.beforeEach(() => {
    user.value = store.getUser();
});
</script>
