import Utils from "../config/utils";
import User from "../classes/User";

const user = Utils.getStore("user");

export default {
    user,
    getUser() {
        if (this.user == null) return null;

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
    },
};
