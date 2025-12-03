<template>
  <v-card class="table-card">
    <v-card-text class="table-wrapper">
      <v-data-table :items="exercises" height="100%">
  
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import {ref, onMounted} from 'vue';
  import exerciseServices from '../../../services/exerciseServices';

  const exercises = ref([]);

  onMounted( async () => {
    exercises.value = await exerciseServices.getAllForUser();
  });
</script>

<style scoped>
.table-card {
  height: 60vh;        /* ✅ card stays confined */
  display: flex;
  flex-direction: column;
}

.table-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}
</style>