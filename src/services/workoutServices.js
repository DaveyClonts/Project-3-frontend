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
    create(workout) {
        try {
            return apiClient.post(API_ROOT, workout);
        } catch (error) {
            console.error("Error creating course:", error);
            return null;
        }
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
        console.log("Retrieving");
        await apiClient
            .get(`${API_ROOT}/${id}`)
            .then((response) => {
                console.log("Got");
                console.log(response.body);
            })
            .catch((err) => {
                console.log("Error: " + err);
            });
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
                return new Workout(
                    name,
                    new Date(date).toISOString().replace("T", " ").slice(0, 16),
                    id,
                    coachID,
                    athleteID
                );
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
                    const date = new Date(data.date)
                        .toISOString()
                        .replace("T", " ")
                        .slice(0, 16);

                    return new Workout(
                        data.name,
                        date,
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
        try {
            return apiClient.delete(`${API_ROOT}/${workoutID}`);
        } catch (error) {
            console.error("Error creating course:", error);
            return null;
        }
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
                    return new WorkoutExercise(e.workoutID, e.exerciseID, true);
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
            .delete(`workoutExercises/${workoutExercise.workoutID}/${workoutExercise.exerciseID}`)
            .then(() => {
                console.log("Deleted exercise from workout.");
            })
            .catch((err) => {
                console.error("Error deleting exercise from workout: " + err);
            });
    },
};
