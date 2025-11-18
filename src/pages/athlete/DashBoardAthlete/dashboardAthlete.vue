<template>
    <div class="page-margins">
        <v-row style="gap: 5vw">
            <v-col class="fill-height flex-grow-0" style="width: 65vw; margin-left: 15px;">
                <v-row>
                    <div class="title-text">
                        Welcome, {{ store.user.firstName}} {{ store.user.lastName }}
                    </div>
                </v-row>
                <v-row>
                    <v-card class="workouts-card">Test</v-card>
                </v-row>
                <v-row>
                    <v-card class="exercises-card">
                        <GoalCalendarAthlete 
                            :goals="goals"/>
                    </v-card>
                </v-row>
            </v-col>
            <v-col>
                <v-card class="athletes-card">
                    <GoalListAthlete 
                        :getGoal="getGoals"
                        :goals="goals"/>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import store from '../../../store/store';
import GoalListAthlete from './goalListAthlete.vue';
import GoalCalendarAthlete from './goalCalendarAthlete.vue';
import goalServices from "../../../services/goalServices";
import { ref } from "vue";

const goals = ref([]);

async function getGoals() {
  const data = await goalServices.getAll();
  goals.value = data;
  return data;
}

getGoals();
</script>

<style scoped>

.page-margins {
    Padding: 40px;
    height: 100vh;
}

.title-text {
    font-size: 30px;
    font-weight: 600;
}

/* margin top and bottom prob not best practice... */
.workouts-card {
    margin-top: 25px;
    margin-bottom: 50px;
    border-radius: 20px;
    width: 65vw;
    height: 25vh;
}

.exercises-card {
    height: 40vh;
    width: 65vw;
    border-radius: 20px;
}

.athletes-card {
    width: 22vw;
    height: 78vh;
    border-radius: 20px;

}
</style>
