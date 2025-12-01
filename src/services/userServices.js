import apiClient from "./services.js";
import User from "../classes/User.js";
import store from "../store/store.js";
import CoachAthlete from "../classes/CoachAthlete.js";

const API_ROOT = "users";

export default {
    async getAllWithRole(role) {
        let users = [];

        await apiClient
            .get(`${API_ROOT}/roles/${role}`)
            .then((roleUsers) => {
                users = roleUsers.data.map(
                    (ru) =>
                        new User(
                            ru.firstName,
                            ru.lastName,
                            ru.role,
                            ru.token,
                            ru.id
                        )
                );
            })
            .catch((err) => {
                console.error("Error getting users: " + err);
            });

        return users;
    },
    async getAthletesForCoach(coachID) {
        let users = [];

        await apiClient
            .get(`coachAthletes/coachAthlete/${coachID}`)
            .then((response) => {
                users = response.data.map((u) => {
                    const athlete = u.athlete;
                    return new User(
                        athlete.firstName,
                        athlete.lastName,
                        athlete.role,
                        null,
                        athlete.id
                    );
                });
            })
            .catch((err) => {
                console.error("Error getting users: " + err);
            });

        return users;
    },
    /**
     *
     * @param {User} user
     */
    async update(user) {
        await apiClient
            .put(`${API_ROOT}/${user.id}`, user)
            .then(() => {
                console.log("Successfully updated user.");
            })
            .catch((err) => {
                console.error("Error updating user: " + err);
            });
    },
    async find(id) {
        let user = {};

        await apiClient
            .get(`${API_ROOT}/${id}`)
            .then((response) => {
                user = new User(
                    response.data.firstName,
                    response.data.lastName,
                    response.data.role,
                    response.data.token,
                    response.data.id
                );
            })
            .catch((err) => {
                console.error("Error finding user: " + err);
            });

        return user;
    },
    async reserveAthlete(athleteID) {
        const coachID = store.getUser().id;
        const coachAthlete = new CoachAthlete(coachID, athleteID);

        await apiClient
            .post(`coachAthletes`, coachAthlete)
            .catch((err) => {
                console.error("Error creating coach athlete: " + err);
            });

        return coachAthlete;
    },
    async releaseAthlete(athleteID) {
        const coachID = store.getUser().id;

        await apiClient
            .delete(`coachAthletes/${coachID}/${athleteID}`)
            .catch((err) => {
                console.error("Error deleting coach athlete: " + err);
            });
    },
};
