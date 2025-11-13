<template>
    <v-app>
        <topbar>
      <navbar tab="/dashboardCoach" v-if="route.path != '/login'" />
        <logout class="logout" v-if="route.path != '/login'" />
          <profileIcon/>
    </topbar>
    <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<style>
.logout {
  position: absolute;
  left: auto;
  right: 40px;
  top: 40px;
}
</style>

<script setup>
  import navbar from './components/navbar.vue';
  import { useRoute } from 'vue-router';

const route = useRoute();
</script>
