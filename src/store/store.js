import Utils from "../config/utils";
import User from "../classes/User";

const user = Utils.getStore("user");
const athlete = Utils.getStore("athlete");

export default {
    user,
    athlete,
    getUser() {
        return new User(
            this.user.firstName,
            this.user.lastName,
            this.user.role,
            this.user.token,
            this.user.id
        );
    },
    setUser(user) {
        this.user = user;
        Utils.setStore("user", user);
    },
    clearUser() {
        this.user = null;
        Utils.removeItem("user");

        this.clearAthlete();
    },
    getAthlete() {
        return this.athlete;
    },
    setAthlete(athlete) {
        this.athlete = athlete;
        Utils.setStore("athlete", athlete);
    },
    clearAthlete() {
        this.athlete = null;
        Utils.removeItem("athlete");
    },
};
