import "./config/global.js";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify.js";
import router from "./router.js";
import store from "./store/store.js";
import './css/global.css';

const app = createApp(App)
.use(vuetify)
.use(router)
.use(store)
.mount("#app");

export default app;