import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import vuetify from "../plugins/vuetify.js";
import 'vuetify/styles';
import login from "./pages/login.vue";
import dashboardCoach from "./pages/coach/dashboard-coach.vue";
import workoutsCoach from "./pages/coach/workouts-coach.vue";
import exercisesCoach from "./pages/coach/exercises-coach.vue";
import athletesCoach from "./pages/coach/athletes-coach.vue";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', name: 'login', component: login},
        {path: '/dashboardCoach', name: 'dashboardCoach', component: dashboardCoach},
        {path: '/workoutsCoach', name: 'workoutsCoach', component: workoutsCoach},
        {path: '/exercisesCoach', name: 'exerciesCoach', component: exercisesCoach},
        {path: '/athletesCoach', name: 'athletesCoach', component: athletesCoach}
    ]
})

createApp(App)
.use(vuetify)
.use(router)
.mount("#app");
