<template>
  <v-app>
    <navbar tab="/dashboardCoach" v-if="route.path != '/login'" />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
  import navbar from './components/navbar.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  
  
</script>