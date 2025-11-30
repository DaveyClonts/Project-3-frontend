<template>
    <div class="athlete-selector-container rounded">
        <v-autocomplete
            class="athlete-selector"
            label="Athlete"
            v-model="athlete"
            :items="athletes"
            :item-title="(a) => `${a.firstName} ${a.lastName}`"
            return-object
            @update:model-value="onAthleteSelected"
        ></v-autocomplete>
    </div>
    <v-card v-if="athlete != null" class="top-container rounded-xl">
        <div class="top-subcontainer">
            <div class="title-container">
                <div class="title">Workouts</div>
                <v-btn
                    class="add-workout-button"
                    :ripple="{ class: 'text-white' }"
                    @click="onAddNewWorkout"
                    >+</v-btn
                >
            </div>
            <div class="top-element-container">
                <workout-selector
                    v-for="workout in workouts"
                    :workout="workout"
                    @workout-selected="onWorkoutSelected"
                    @workout-deleted="onWorkoutDeleted"
                />
            </div>
        </div>
    </v-card>
    <v-dialog class="dialog" v-model="isDialogVisible">
        <v-card class="dialog-card">
            <workout-builder ref="builder" :workout="selectedWorkout" />
            <div class="button-container">
                <v-btn
                    class="save-button"
                    :disabled="inputDisabled"
                    @click="save()"
                    >Save</v-btn
                >
                <v-btn
                    class="cancel-button"
                    :disabled="inputDisabled"
                    @click="cancel()"
                    >Cancel</v-btn
                >
            </div>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.athlete-selector-container {
    width: 500px;
    height: 55px;
    background-color: var(--color-primary);
    justify-self: center;
}

.athlete-selector {
    width: 100%;
}

.top-container {
    margin-top: 8px;
    width: 500px;
    padding: 20px;
    height: 72.5vh;
    background-color: var(--color-primary);
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-self: center;
}

.top-subcontainer {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.title-container {
    display: flex;
    flex-direction: row;
    border-width: 0px 0px 2px 0px;
    border-color: var(--color-secondary);
    border-style: solid;
    align-items: center;
    justify-items: center;
}

.add-workout-button {
    background-color: var(--btn-secondary);
    color: var(--btn-secondary-text);
    height: 32px;
    width: 32px;
    min-width: 32px !important;
    margin-bottom: 8px;
}

.top-element-container {
    width: 100%;
    height: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    overflow: auto scroll;
    overflow-y: auto;
    scrollbar-color: var(--color-text-secondary) transparent;
}

.workout-list {
    width: 100%;
}

.title {
    font-size: 20px;
    text-align: center;
    margin-top: 6px;
    padding-bottom: 12px;
    width: 100%;
}

.dialog {
    max-width: 950px;
    min-width: 450px;
}

.dialog-card {
    background-color: var(--color-bg);
}

.button-container {
    margin: 0 12px 12px auto;
    display: flex;
    gap: 16px;
}

.builder-card {
    background-color: var(--color-bg);
}

.save-button {
    background-color: var(--btn-primary);
    color: var(--btn-primary-text);
}

.cancel-button {
    background-color: var(--color-text-secondary);
    color: var(--btn-primary-text);
}
</style>

<script setup>
import { ref } from "vue";
import workoutBuilder from "../../components/workouts/workoutBuilder.vue";
import workoutSelector from "../../components/workouts/workoutSelector.vue";
import userServices from "../../services/userServices.js";
import workoutServices from "../../services/workoutServices.js";
import UserRole from "../../classes/userRole.js";
import store from "../../store/store.js";
import Workout from "../../classes/Workout.js";

const isDialogVisible = ref(false);
const inputDisabled = ref(false);
const athletes = ref([]);
const athlete = ref(null);
const workouts = ref([]);
const selectedWorkout = ref(null);
const builder = ref([]);

loadAthletes();

function onAddNewWorkout() {
    const coachID = store.getUser().id;
    const athleteID = athlete.value.id;

    let workout = new Workout("Workout", Date.now(), null, coachID, athleteID);

    openDialog(workout);
}

function save() {
    inputDisabled.value = true;

    if (selectedWorkout.value.id == null)
        workoutServices.create(selectedWorkout.value).then(() => {
            saveExercises().then(() => {
                closeDialog();
                loadWorkouts();
            });
        });
    else
        workoutServices.update(selectedWorkout.value).then(() => {
            saveExercises().then(() => {
                closeDialog();
                loadWorkouts();
            });
        });
}

function cancel() {
    inputDisabled.value = true;

    closeDialog();
}

async function saveExercises() {
    let newExercises = builder.value.workoutExercises.filter(
        (e) => !e.fromDatabase
    );
    let deletedExercises = builder.value.deletedExercises;

    const deletePromises = deletedExercises.map(async (workoutExercise) => {
        await workoutServices
            .deleteExercise(workoutExercise)
            .catch((err) => console.error("Error deleting exercise: " + err));
    });

    await Promise.all(deletePromises);

    const createPromises = newExercises.map(async (workoutExercise) => {
        await workoutServices
            .addExercise(workoutExercise)
            .catch((err) => console.error("Error saving exercise: " + err));
    });

    await Promise.all(createPromises);
}

function openDialog(workout) {
    selectedWorkout.value = workout;
    isDialogVisible.value = true;
}

function closeDialog() {
    selectedWorkout.value = null;
    inputDisabled.value = false;
    isDialogVisible.value = false;
}

function onWorkoutSelected(workout) {
    openDialog(workout);
}

function onWorkoutDeleted(workout) {
    workoutServices
        .delete(workout.id)
        .then(() => loadWorkouts())
        .catch((err) => {
            console.log("Error deleting workout: " + err);
        });
}

function loadAthletes() {
    userServices
        .getAllWithRole(UserRole.Athlete)
        .then((databaseAthletes) => {
            athletes.value = databaseAthletes.map((da) => {
                return {
                    id: da.id,
                    firstName: da.firstName,
                    lastName: da.lastName,
                };
            });
        })
        .catch((err) => {
            console.error("Error retrieving athletes: " + err);
        });
}

function onAthleteSelected(athlete) {
    if (athlete == null || athlete.id == null) {
        workouts.value = [];
        return;
    }

    console.log("Athlete selected: " + JSON.stringify(athlete));
    loadWorkouts();
}

function loadWorkouts() {
    const coachID = store.getUser().id;
    const athleteID = athlete.value.id;

    workouts.value = [];

    workoutServices
        .getAllForCoachAndAthlete(coachID, athleteID)
        .then((databaseWorkouts) => {
            workouts.value = databaseWorkouts.map(
                (workout) =>
                    new Workout(
                        workout.name,
                        workout.date,
                        workout.id,
                        workout.coachID,
                        workout.athleteID
                    )
            );
        })
        .catch((err) => {
            console.log("Error retrieving workouts: " + err);
        });
}
</script>
