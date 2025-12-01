import { createRouter, createWebHistory } from "vue-router";
import login from "./pages/login.vue";
import dashboardCoach from "./pages/coach/dashboard/dashboard-coach.vue";
import workoutsCoach from "./pages/coach/workouts-coach.vue";
import exercisesCoach from "./pages/coach/exercises-coach.vue";
import athletesCoach from "./pages/coach/athletes-coach.vue";
import goalAthlete from "./pages/athlete/GoalPage/goalsAthlete.vue";
import dashboardAthlete from "./pages/athlete/DashBoardAthlete/dashboardAthlete.vue";
import workoutsAthlete from "./pages/athlete/WorkoutPage/workoutsAthlete.vue";
import store from "./store/store.js";
import authServices from "./services/authServices.js";
import roleSelect from "./pages/roleSelect.vue";

const router = createRouter({
    //removes the # from the url
    history: createWebHistory(),

    // the url /login exsits rn but we can just do / if we want (this doesnt actually matter)
    routes: [
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: "/callback",
            redirect: "/login",
        },
        {
            path: "/login",
            name: "login",
            component: login,
            meta: { noNavigation: true },
        },
        {
            path: "/roleSelect",
            name: "roleSelect",
            component: roleSelect,
            meta: { noNavigation: true },
        },
        {
            path: "/dashboardCoach",
            name: "dashboardCoach",
            component: dashboardCoach,
            meta: { requiresAuth: true },
        },
        {
            path: "/workoutsCoach",
            name: "workoutsCoach",
            component: workoutsCoach,
            meta: { requiresAuth: true },
        },
        {
            path: "/exercisesCoach",
            name: "exercisesCoach",
            component: exercisesCoach,
            meta: { requiresAuth: true },
        },
        {
            path: "/athletesCoach",
            name: "athletesCoach",
            component: athletesCoach,
            meta: { requiresAuth: true },
        },
        {
            path: "/goalsAthlete",
            name: "goalsAthlete",
            component: goalAthlete,
            meta: { requiresAuth: true },
        },
        {
            path: "/dashboardAthlete",
            name: "dashboardAthlete",
            component: dashboardAthlete,
            meta: { requiresAuth: true },
        },
        {
            path: "/workoutsAthlete",
            name: "workoutsAthlete",
            component: workoutsAthlete,
            meta: { requiresAuth: true },
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (!to.meta.requiresAuth) {
        next();
        return;
    }

    const user = store.getUser();

    if (user === null) {
        next({ name: "login" });
        return;
    }

    authServices
        .authorizeUser(user)
        .then(() => {
            if (user.role === null) {
                next({ name: "roleSelect" });
                return;
            }
            else
                next();
        })
        .catch((err) => {
            console.log(`Error authorizing user: ${err}`);
            next({ name: "login" });
        });
});

export default router;
