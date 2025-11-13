import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify.js";
import router from "./router.js";
import store from "./store/store.js";
import './css/global.css';

const app = createApp(App)
.use(vuetify)
.use(router)
.mount("#app");

export default app;