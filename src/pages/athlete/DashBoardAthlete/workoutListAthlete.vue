<template>
  <v-card class="builder-container rounded-xl">
    <div class="subcontainer right-outline">
      <div class="title">Workout Today</div>
    </div>
    <div class="subcontainer">
      <div class="title">{{ props.workout?.name ?? "None Today!" }}</div>
    </div>
  </v-card>
</template>

<script setup>
import WorkoutDisplay from "./goalDisplayAthlete.vue";



const props = defineProps({
  workout: {
    type: Object
  },
});
</script>

<style scoped>
.builder-container {
  height: 100%;
  width: 100%;
  background-color: var(--color-primary);
  display: flex;
  flex-direction: row;
  justify-content: left;
}

.subcontainer {
    width: 20%;
    gap: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    overflow: auto scroll;
    overflow-y: auto;
}

.title {
  border-width: 0px 2px 0px 0px;
  border-color: rgb(82, 82, 82);
  border-style: solid;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  height: 80%;
  width: 100%;
}


</style>
