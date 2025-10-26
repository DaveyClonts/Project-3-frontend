import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import vuetify from "../plugins/vuetify.js";

const router = createRouter({
    history: createWebHistory(),

    routes: []
})

createApp(App).use(vuetify).use(router).mount("#app");
