import apiClient from "./services.js";

export default {
    loginUser(user) {
        return apiClient.post("login", user);
    },
    authorizeUser(user) {
        return apiClient.post("authorize", user);
    },
    logoutUser(token) {
        return apiClient.post("logout", token);
    },
};
