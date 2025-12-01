import apiClient from "./services.js";
import Workout from "../classes/Workout.js";
import store from "../store/store.js";
import WorkoutExercise from "../classes/WorkoutExercise.js";

const API_ROOT = "workouts";

export default {
    /**
     *
     * @param {Workout} workout
     */
    async create(workout) {
        let createdWorkout = {};

        await apiClient
            .post(API_ROOT, workout)
            .then((response) => {
                console.log("Created workout: " + JSON.stringify(response));

                createdWorkout = new Workout(
                    response.data.name,
                    response.data.date,
                    response.data.id,
                    response.data.coachID,
                    response.data.athleteID
                );
            })
            .catch((err) => console.error("Error creating course: " + err));

        return createdWorkout;
    },

    /**
     *
     * @param {Workout[]} workouts
     */
    createAll(workouts) {
        try {
            return apiClient.post(`${API_ROOT}/all`, workouts);
        } catch (error) {
            console.error("Error creating multiple workouts!");
            return null;
        }
    },

    /**
     * @returns {Promise<Workout>}
     */
    async get(id) {
        let workout = {};

        console.log("Retrieving");
        await apiClient
            .get(`${API_ROOT}/${id}`)
            .then((response) => {
                workout = new Workout(
                    response.body.name,
                    response.body.date,
                    response.body.id,
                    response.body.coachID,
                    response.body.athleteID
                );
            })
            .catch((err) => {
                console.log("Error: " + err);
            });

        return workout;
    },

    /**
     * @returns {Promise<Workout>}
     */
    async getAllForCoach() {
        try {
            const userID = store.getUser().id;
            console.log("Retrieving workouts for user", userID);
            const response = await apiClient.get(
                `${API_ROOT}/coachWorkouts/${userID}`
            );
            console.log("Got workouts:", response.data);

            return response.data.map((workoutObject) => {
                const { name, date, id, coachID, athleteID } = workoutObject; // match backend
                return new Workout(name, date, id, coachID, athleteID);
            });
        } catch (err) {
            console.error("Error fetching workouts:", err);
            return [];
        }
    },

    /**
     * @returns {Promise<Workout>}
     */
    async getAllForAthlete() {
        try {
            const userID = store.getUser().id;
            console.log("Retrieving workouts for user", userID);
            const response = await apiClient.get(
                `${API_ROOT}/athleteWorkouts/${userID}`
            );
            console.log("Got workouts:", response.data);

            return response.data.map((workoutObject) => {
                const { name, date, id, coachID, athleteID } = workoutObject; // match backend
                return new Workout(name, date, id, coachID, athleteID);
            });
        } catch (err) {
            console.error("Error fetching workouts:", err);
            return [];
        }
    },

    /**
     * @returns {Promise<Workout>}
     */
    async getAllForCoachAndAthlete(coachID, athleteID) {
        let workouts = [];

        await apiClient
            .get(`${API_ROOT}/coachAthleteWorkouts/${coachID}/${athleteID}`)
            .then((workoutData) => {
                workouts = workoutData.data.map((data) => {
                    return new Workout(
                        data.name,
                        data.date,
                        data.id,
                        data.coachID,
                        data.athleteID
                    );
                });
            })
            .catch((err) => {
                console.error("Error fetching workouts: " + err);
            });

        return workouts;
    },

    /**
     * @returns {Promise<Workout>}
     */
    async delete(workoutID) {
        await apiClient
            .delete(`workoutExercises/${workoutID}`)
            .then(async () => {
                await apiClient
                    .delete(`${API_ROOT}/${workoutID}`)
                    .catch((err) => {
                        console.error("Error deleting workout: " + err);
                    })
                    .catch((err) => {
                        console.error("Error deleting workout: " + err);
                    });
            })
            .catch((err) => {
                console.error("Error deleting workout exercises: " + err);
            });
    },

    /**
     * @returns {Promise<Workout>}
     */
    async update(workout) {
        try {
            return apiClient.put(`${API_ROOT}/${workout.id}`, workout);
        } catch (error) {
            console.error("Error creating course:", error);
            return null;
        }
    },

    async getExercises(workoutID) {
        let exercises = [];

        await apiClient
            .get(`workoutExercises/${workoutID}`)
            .then((workoutExercises) => {
                exercises = workoutExercises.data.map((e) => {
                    if (e.weight !== undefined) {
                        return WorkoutExercise.WeightExercise(
                            e.workoutID,
                            e.exerciseID,
                            e.reps,
                            e.sets,
                            e.weight,
                            true
                        );
                    } else {
                        return WorkoutExercise.CardioExercise(
                            e.workoutID,
                            e.exerciseID,
                            e.miles,
                            e.time,
                            true
                        );
                    }
                });
            })
            .catch((err) => {
                console.error(`Error retrieving exercises: ${err}`);
            });

        return exercises;
    },

    async addExercise(workoutExercise) {
        let body = {
            workoutID: workoutExercise.workoutID,
            exerciseID: workoutExercise.exerciseID,
        };

        await apiClient
            .post("workoutExercises/", body)
            .then(() => {
                console.log("Added exercise to workout.");
            })
            .catch((err) => {
                console.error("Error adding exercise to workout: " + err);
            });
    },

    async deleteExercise(workoutExercise) {
        await apiClient
            .delete(
                `workoutExercises/${workoutExercise.workoutID}/${workoutExercise.exerciseID}`
            )
            .then(() => {
                console.log("Deleted exercise from workout.");
            })
            .catch((err) => {
                console.error("Error deleting exercise from workout: " + err);
            });
    },

    async updateExercise(workoutExercise) {
        await apiClient
            .put(`workoutExercises`, workoutExercise)
            .then(() => {
                console.log("Updated exercise from workout.");
            })
            .catch((err) => {
                console.error("Error updating workout exercise: " + err);
            });
    },
};
