import apiClient from "./services.js";
import User from "../classes/User.js";

const API_ROOT = "users";

export default {
    async getAllWithRole(role) {
        let users = [];

        await apiClient
            .get(`${API_ROOT}/roles/${role}`)
            .then((roleUsers) => {
                users = roleUsers.map(
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
