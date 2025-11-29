import apiClient from "./services.js";
import User from "../classes/User.js";

const API_ROOT = "users";

export default {
    async getAllWithRole(role) {
        let users = [];

        await apiClient
            .get(`${API_ROOT}/roles/${role}`)
            .then((response) => {
                users = response.data.map(
                    (u) => {
                        return new User (
                            u.firstName,
                            u.lastName,
                            u.role,
                            u.id
                        )
                    }
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
                users = response.data.map(
                    (u) => {
                        const athlete = u.athlete;
                        return new User (
                            athlete.firstName,
                            athlete.lastName,
                            athlete.role,
                            athlete.id
                        )
                    }
                );
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
};
