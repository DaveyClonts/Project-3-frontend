<template>
  <div class="page-margins">
    <v-row style="gap: 5vw">

      <!-- left column -->
      <v-col
        class="left-column"
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

      <!-- right column -->
      <v-col class="right-column">
        <athletesCard class="athletes-card"/>
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

.left-column {
  height: 75vh;
  display: flex;
  flex-direction: column;
}

.right-column {
  height: 75vh;
  display: flex;
  flex-direction: column;
}

.workouts-card {
  margin-top: 2.5vh;
  margin-bottom: 5vh;
  border-radius: 20px;
  width: 65vw;
  height: 22vh;
  background-color: var(--color-primary);
}

.exercises-card {
  height: 37vh;
  width: 65vw;
  border-radius: 20px;
}

.athletes-card {
  width: 22vw;
  height: 100%;
  border-radius: 20px;
  padding: 20px;
}
</style>
