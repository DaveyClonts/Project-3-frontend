<script setup></script>

<template>
    <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="login-card">
      <v-card-text class="title">Get Started!</v-card-text>
      <v-col class="d-flex flex-column align-center" style="gap: 20px">
          <v-btn class="button" variant="tonal" to="/dashboardCoach">Login</v-btn>
          <v-btn class="button" variant="tonal">Login as Admin</v-btn>
    </v-col>
    </v-card>
  </v-container>
</template>

<style scoped>
    .login-card {
        background-color: #f2f2f2;
        text-align: center;
        width: 30%;
        height: 50%;
        border-radius: 40px;
    }

    .title {
        padding-top: 40%;
        font-size: 26px;
        font-weight: 600;
    }

    .button {
        width: 300px;
    }
</style>