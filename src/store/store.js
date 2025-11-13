import Utils from "../config/utils";
import { createStore } from "vuex";

const user = Utils.getStore("user");
console.log("initialize: " + JSON.stringify(user));
    
const store = createStore({
    state: {
        loginUser: user
    },
    mutations: {
        setLoginUser(state, user) {
            console.log("Set user: " + user);

            state.loginUser = user;
            Utils.setStore("user", user);
        },
    },
    getters: {
        getLoginUser(state) {
            console.log("get: " + JSON.stringify(state));

            return state.loginUser;
        }
    }
});

store.commit("setLoginUser", user);

export default store;
