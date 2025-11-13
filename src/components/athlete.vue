<template>
    <v-card class="item">
        <div class="row">
            <div class="profile-icon">
                <v-icon>mdi-account</v-icon>
            </div>

            <div class="name">Test Athlete</div>
        </div>
    </v-card>
</template>

<style scoped>
.item {
    background-color: grey;
    width: 20vw;
    height: 5vh;
    border-radius: 30px;
    display: flex;
    align-items: center;
    padding-left: 5px;
}

.row {
    display: flex;
    flex-direction: row;
}

/* .column {
    display: flex;
    flex-direction: column;
} */

.profile-icon {
    background-color: #d0d0d0;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.name {
    color: #d0d0d0;
    padding-left: 2vw;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
}
</style>