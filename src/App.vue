<template>
  <v-app>
    <topbar>
      <navbar tab="/dashboardCoach" v-if="route.path != '/login'" />
      <profileIcon/>
    </topbar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
  import topbar from './components/topbar.vue';
  import navbar from './components/navbar.vue';
  import profileIcon from './components/profileIcon.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
</script>