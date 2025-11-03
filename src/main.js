import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify.js";
import router from "./router.js";
import store from "./store/store.js";

createApp(App)
.use(vuetify)
.use(router)
.use(store)
.mount("#app");
