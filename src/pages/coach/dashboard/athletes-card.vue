<template>
    <v-card>
        <div class="title">Your Athletes</div>

        <div class="populated" v-if="athletes.length > 0">
            <athlete v-for="athlete in athletes">
                {{ athlete.getFullName() }}
            </athlete>
            <athleteButton> View Athletes </athleteButton>
        </div>
        <div class="empty-content">
            <div class="no-athletes" v-if="athletes.length == 0">
                <div class="text">You have no assigned athletes...</div>
                <v-btn
                    variant="text"
                    class="button-none"
                    @click="router.push('/athletesCoach')"
                >
                    Assign athletes?
                </v-btn>
            </div>
        </div>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import athlete from "../../../components/athlete.vue";
import athleteButton from "../../../components/athleteButton.vue";
import userServices from "../../../services/userServices";
import store from "../../../store/store";

const athletes = ref([]);
const router = useRouter();

onMounted(async () => {
    athletes.value = await userServices.getAthletesForCoach(store.getUser().id);
});
</script>

<style scoped>
.empty-content {
    width: 100%;
    height: 60vh;
    padding-bottom: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title {
    font-size: 25px;
    font-weight: 600;
    padding-bottom: 10px;
}

.no-athletes {
    display: flex;
    flex-direction: column;
    gap: 2.5vh;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.populated {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
}

.text {
    font-size: 18px;
    font-weight: 400;
    color: var(--color-text-secondary);
}

.button-none {
    color: var(--color-text-secondary);
    text-transform: none;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: normal;
    text-decoration: underline;
}
</style>
