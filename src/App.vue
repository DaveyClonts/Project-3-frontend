<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <v-app>
    <MenuBar :key="$route.fullPath" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
