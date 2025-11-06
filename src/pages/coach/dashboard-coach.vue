<template>
    <div class="page-margins">
        <v-col class="fill-height flex-grow-0" style="width: 70vw">
            <v-row>
                <div class="title-text">
                    Welcome, Coach Jones
                </div>
            </v-row>
            <v-row>
                <v-card class="card">Test</v-card>
            </v-row>
            <v-row>
                <v-card>Test</v-card>
            </v-row>
        </v-col>
        <v-col>
            <v-card></v-card>
        </v-col>
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

.card {
    margin-top: 25px;
    margin-bottom: 50px;
    border-radius: 20px;
    width: 70vw;
    height: 30vh;
}

</style>

<script setup>
    
</script>