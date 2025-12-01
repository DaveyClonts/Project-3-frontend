import apiClient from "./services.js";
import Exercise from "../classes/Exercise.js";
import store from "../store/store.js";

const API_ROOT = "exercises";

export default {
    /**
     *
     * @param {Exercise} exercise
     */
    async create(exercise) {
        await apiClient
            .post(API_ROOT, exercise)
            .then(() => {
                console.log("Successfully created exercise.");
            })
            .catch((err) => {
                console.error("Error creating exercise: " + err);
            });
    },

    /**
     * @returns {Promise<Exercise>}
     */
    async get(id) {
        let exercise = {};

        await apiClient
            .get(`${API_ROOT}/${id}`)
            .then((response) => {
                exercise = new Exercise(
                    response.data.name,
                    response.data.type,
                    response.data.description,
                    response.data.coachID,
                    response.data.id
                );
            })
            .catch((err) => {
                console.log("Could not find exercise: " + err);
            });

        return exercise;
    },

    /**
     * @returns {Promise<Exercise[]>}
     */
    async getAllForUser() {
        const userID = store.getUser().id;
        let results = [];

        await apiClient
            .get(`${API_ROOT}/coachExercises/${userID}`)
            .then((exerciseData) => {
                results = exerciseData.data.map((e) => {
                    return new Exercise(
                        e.name,
                        e.type,
                        e.description,
                        e.coachID,
                        e.id
                    );
                });
            })
            .catch((err) => {
                console.error("Error retrieving exercises: " + err);
            });

        return results;
    },

    /**
     *
     * @param {number} id
     */
    async delete(id) {
        await apiClient
            .delete(`${API_ROOT}/${id}`)
            .then(() => {
                console.log("Successfully deleted exercise.");
            })
            .catch((err) => {
                console.error("Error deleting exercise: " + err);
            });
    },

    /**
     *
     * @param {Exercise} exercise
     */
    async update(exercise) {
        await apiClient
            .put(`${API_ROOT}/${exercise.id}`, exercise)
            .then(() => {
                console.log("Successfully updated exercise.");
            })
            .catch((err) => {
                console.error("Error updating exercise: " + err);
            });
    },
};
