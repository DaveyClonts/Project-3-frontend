import login from "./pages/login.vue";
import dashboardCoach from "./pages/coach/dashboard-coach.vue";
import workoutsCoach from "./pages/coach/workouts-coach.vue";
import exercisesCoach from "./pages/coach/exercises-coach.vue";
import athletesCoach from "./pages/coach/athletes-coach.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),

    // the url /login exsits rn but we can just do / if we want (this doesnt actually matter)
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', name: 'login', component: login},
        {path: '/dashboardCoach', name: 'dashboardCoach', component: dashboardCoach},
        {path: '/workoutsCoach', name: 'workoutsCoach', component: workoutsCoach},
        {path: '/exercisesCoach', name: 'exercisesCoach', component: exercisesCoach},
        {path: '/athletesCoach', name: 'athletesCoach', component: athletesCoach}
    ]
})

export default router;