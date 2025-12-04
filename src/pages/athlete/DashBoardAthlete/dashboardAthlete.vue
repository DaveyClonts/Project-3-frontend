<template>
  <div class="page-margins">
    <v-row style="gap: 5vw">
      <v-col
        class="fill-height flex-grow-0"
        style="width: 65vw; margin-left: 15px"
      >
        <v-row>
          <div class="title-text">Welcome, {{ user.firstName + " " + user.lastName}}</div>
        </v-row>
        <div class="left-column">
          <v-row>
          <v-card class="workouts-card">
            <WorkoutAthlete :workout="workout" />
          </v-card>
        </v-row>
        <v-row>
          <v-card class="exercises-card">
            <CalendarAthlete :goals="goals" :workouts="workouts" />
          </v-card>
                  </v-row>

        </div>
      </v-col>
      <v-col>
        <v-card class="goal-card">
          <GoalListAthlete :getGoal="getGoals" :goals="goals" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import store from "../../../store/store";
import GoalListAthlete from "./goalListAthlete.vue";
import CalendarAthlete from "./calendarAthlete.vue";
import WorkoutAthlete from "./workoutListAthlete.vue";
import goalServices from "../../../services/goalServices";
import workoutServices from "../../../services/workoutServices";
import User from "../../../classes/User";
import { ref } from "vue";

const user = store.getUser();
const goals = ref([]);
const workout = ref(null);
const workouts = ref([]);

async function getGoals() {
  const data = await goalServices.getAll();
  goals.value = data;
  return data;
}

async function getWorkouts() {
  const data = await workoutServices.getAllForAthlete();

  const now = new Date(); 

const cstYear = now.getFullYear();
const cstMonth = String(now.getMonth() + 1).padStart(2, "0"); 
const cstDate = String(now.getDate()).padStart(2, "0");

const todayStr = `${cstYear}-${cstMonth}-${cstDate}`;

  workouts.value = data.map((w) => ({
    ...w,
    date: new Date(w.date).toISOString().split("T")[0], 
  }));
  
  workout.value = data.find((w) => {
    const workoutDateStr = new Date(w.date).toISOString().split("T")[0];
    return workoutDateStr === todayStr;
  });
}

getWorkouts();
getGoals();
</script>

<style scoped>
.page-margins {
  padding: 40px;
  height: 100vh;
}

.title-text {
  font-size: 30px;
  font-weight: 600;
}

.left-column {
  height: 75vh;
  display: flex;
  flex-direction: column;
}

.workouts-card {
  margin-top: 25px;
  margin-bottom: 50px;
  border-radius: 20px;
  width: 65vw;
  height: 15vh;
}

.exercises-card {
  height: 55%;
  width: 65vw;
  border-radius: 20px;
}

.goal-card {
  width: 22vw;
  height: 78vh;
  border-radius: 20px;
}
</style>
