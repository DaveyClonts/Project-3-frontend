<template>
    <v-card>
        <div class="row" style="justify-content: space-between">
            <div class="title">Your Workouts</div>
            <v-btn
                variant="tonal"
                class="view-workouts-btn"
                @click="router.push('/workoutsCoach')"
            >
                View Workouts
            </v-btn>
        </div>
        <div class="row">
            <v-slide-group class="slide" style="height: 18vh" show-arrows>
                <v-slide-group-item v-for="workout in workouts">
                    <workout class="mx-4">
                        {{ workout.name }}
                    </workout>
                </v-slide-group-item>
            </v-slide-group>
            <div class="unpopulated" v-if="workouts.length == 0">
                <div class="empty-text">You have no workouts...</div>
                <v-btn
                    variant="text"
                    class="button-none"
                    @click="router.push('/workoutsCoach')"
                >
                    Create a Workout?
                </v-btn>
            </div>
        </div>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vuetify/lib/composables/router.mjs";
import workout from "../../../components/workout.vue";
import workoutServices from "../../../services/workoutServices";

const router = useRouter();
const workouts = ref([]);

onMounted(async () => {
    workouts.value = await workoutServices.getAllForCoach();
});
</script>

<style scoped>
.row {
    display: flex;
    flex-direction: row;
}

.slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 18vh;
}

.title {
    font-weight: 600;
    font-size: 25px;
}

.view-workouts-btn {
    border-radius: 40px;
    background-color: var(--btn-secondary);
    color: var(--btn-secondary-text);
}

.unpopulated {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}

.empty-text {
    font-size: 18px;
    font-weight: 400;
    color: var(--color-text-secondary);
}

.button-none {
    color: var(--color-text-secondary);
    text-transform: none;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: normal;
    text-decoration: underline;
}
</style>
