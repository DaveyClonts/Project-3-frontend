import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "../plugins/vuetify.js";
import 'vuetify/styles';
import router from './router.js'

createApp(App)
.use(vuetify)
.use(router)
.mount("#app");
