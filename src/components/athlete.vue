<template>
    <v-card class="item">
        <div class="row">
            <div class="profile-icon">
                <v-icon>mdi-account</v-icon>
            </div>

            <div class="name">
                <slot>
                    
                </slot>
            </div>
        </div>
    </v-card>
</template>

<style scoped>
.item {
    background-color: var(--color-bg);
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

.profile-icon {
    background-color: var(--color-primary);
    width: 2.75vw;
    height: 4vh;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.name {
    color: var(--color-text-primary);
    padding-left: 2vw;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
}
</style>