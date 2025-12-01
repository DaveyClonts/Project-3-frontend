<template>
  <div class="page-margins">
    <v-row style="gap: 5vw">
      <v-col
        class="fill-height flex-grow-0"
        style="width: 65vw; margin-left: 15px"
      >
        <v-row>
          <div class="title-text">Welcome, {{ user.getFullName() }}</div>
        </v-row>
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

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

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

/* margin top and bottom prob not best practice... */
.workouts-card {
  margin-top: 25px;
  margin-bottom: 50px;
  border-radius: 20px;
  width: 65vw;
  height: 15vh;
}

.exercises-card {
  height: 60vh;
  width: 65vw;
  border-radius: 20px;
}

.goal-card {
  width: 22vw;
  height: 78vh;
  border-radius: 20px;
}
</style>
