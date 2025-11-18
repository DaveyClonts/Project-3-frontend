<template>
    <v-card class="selector-container rounded-xl">
        <div class="selector-subcontainer">
            <div>
                <div class="selector-title">Exercise Title</div>
                <div class="selector-subtitle">Group 1, Group 2</div>
            </div>
            <v-btn
                class="select-button rounded-xl"
                variant="text"
                :ripple="{ class: 'text-white' }"
                >></v-btn
            >
        </div>
    </v-card>
</template>

<style>
.selector-container {
    background-color: #848484;
    height: 80px;
    width: 380px;
    padding: 12px 24px 8px 24px;
    flex: 0 0 auto;
}

.selector-subcontainer {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.select-button {
    height: 150% !important;
    width: 40px;
    margin-left: auto;
    margin-right: -24px;
    align-self: center;
    color: white;
}

.selector-title {
    font-size: 20px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.selector-subtitle {
    font-size: 16px;
    color: whitesmoke;
    margin-top: -2px;
    margin-left: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
