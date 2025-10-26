import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import vuetify from "../plugins/vuetify.js";
import login from "./pages/login.vue";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', name: 'login', component: login}
    ]
})

createApp(App).use(vuetify).use(router).mount("#app");
