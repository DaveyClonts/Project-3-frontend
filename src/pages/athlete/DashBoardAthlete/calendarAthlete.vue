<template>
  <v-sheet class="calendar-container">
    <VCalendar
          ref="calendar"
          v-model="focus"
          :event-color="getEventColor"
          :events="events"
          :type="month"
          :model-value="today"
          class="calendar no-interaction"
    ></VCalendar>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from "vue";
import { VCalendar } from "vuetify/labs/VCalendar";

const props = defineProps({
  goals: Array,
  workouts: Array
});

const today = ref(new Date().toISOString().substr(0, 10));

const events = computed(() => {
  const goalEvents = props.goals.map(goal => ({
    name: goal.name,
    start: goal.date,
    end: goal.date,
    color: goal.color || "blue",
  }));

  const workoutEvents = props.workouts.map(workout => ({
    name: workout.name,
    start: workout.date,
    end: workout.date,
    color: workout.color || "red",
  }));


  return [...goalEvents, ...workoutEvents];
});
console.log(events);
</script>

<style scoped>
.calendar-container {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
    background: #848484;
}

.v-calendar-month .v-day {
  min-height: 120px; 
}

.v-calendar-month .v-event {
  font-size: 2000rem;
  padding: 4px 6px;
}

.no-interaction {
  pointer-events: none !important;
}

.no-interaction * {
  user-select: none !important;
}

</style>
