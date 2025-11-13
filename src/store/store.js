import Utils from "../config/utils";

const user = Utils.getStore("user");

export default {
    user,
    getUser() {
        return this.user;
    },
    setUser(user) {
        this.user = user;
        Utils.setStore("user", user);
    },
    clearUser() {
        Utils.removeItem("user");
    }
}
