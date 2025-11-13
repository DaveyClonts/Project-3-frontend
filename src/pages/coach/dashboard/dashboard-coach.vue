<template>
    <div class="page-margins">
        <v-row style="gap: 5vw">
            <v-col class="fill-height flex-grow-0" style="width: 65vw; margin-left: 15px;">
                <v-row>
                    <div class="title-text">
                        Welcome, Coach Jones
                    </div>
                </v-row>
                <v-row>
                    <v-card class="workouts-card">Test</v-card>
                </v-row>
                <v-row>
                    <v-card class="exercises-card">Test</v-card>
                </v-row>
            </v-col>
            <v-col>
                 <athletesCard/>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>

.page-margins {
    Padding: 40px;
    height: 100vh;
}

.title-text {
    font-size: 30px;
    font-weight: 600;
}

/* margin top and bottom prob not best practice... */
.workouts-card {
    margin-top: 25px;
    margin-bottom: 50px;
    border-radius: 20px;
    width: 65vw;
    height: 25vh;
}

.exercises-card {
    height: 45vh;
    width: 65vw;
    border-radius: 20px;
}
</style>

<script setup>
    import athletesCard from './athletes-card.vue';
</script>