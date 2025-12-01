<template>
  <div class="page-margins">
    <v-row style="gap: 5vw">
      <v-col
        class="fill-height flex-grow-0"
        style="width: 65vw; margin-left: 15px"
      >
        <v-row>
          <div class="title-text">Welcome, Coach {{ user.lastName }}</div>
        </v-row>
        <v-row>
          <v-card class="workouts-card"><workoutCard /></v-card>
        </v-row>
        <v-row>
          <v-card class="exercises-card"><exerciseCard /></v-card>
        </v-row>
      </v-col>
      <v-col>
        <athletesCard />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import athletesCard from "./athletes-card.vue";
import User from "../../../classes/User.js";
import store from "../../../store/store.js";
import workoutCard from "./workout-card.vue";
import exerciseCard from "./exercise-card.vue";

const user = store.getUser();
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
  background-color: var(--color-primary);
}

.exercises-card {
  height: 60vh;
  width: 65vw;
  border-radius: 20px;
}
</style>
