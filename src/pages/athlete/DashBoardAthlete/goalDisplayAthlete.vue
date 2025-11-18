<template>
  <v-card class="goal-container rounded-xl">
    <div class="goal-subcontainer">
      <div>
        <div class="goal-title">{{ props.goal.name }}</div>
        <div class="goal-subtitle">{{ props.goal.date }}</div>
      </div>
    </div>
  </v-card>
</template>

<script setup>

const props = defineProps({
  goal: Object,
});


</script>

<style scoped>
.goal-container {
  background-color: #848484;
  height: 80px;
  width: 380px;
  padding: 12px 24px 8px 24px;
  flex: 0 0 auto;
}

.goal-subcontainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.goal-title {
  font-size: 20px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.goal-subtitle {
  font-size: 16px;
  color: whitesmoke;
  margin-top: -2px;
  margin-left: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
