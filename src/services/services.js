import axios from "axios";
import Utils from "../config/utils.js";
import AuthServices from "./authServices.js";

let baseURL = "";

if (process.env.NODE_ENV === "development")
    baseURL = "http://localhost/tracker-t6/";
else baseURL = "/tracker-t6/";

const apiClient = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        crossDomain: true,
    },
    transformRequest: (data, headers) => {
        const user = Utils.getStore("user");

        if (user != null) {
            const token = user.token;
            let authHeader = "";

            if (token != null && token != "") authHeader = "Bearer " + token;

            headers.common["Authorization"] = authHeader;
        }

        return JSON.stringify(data);
    },
    transformResponse: (data) => {
        data = JSON.parse(data);

        if (
            data.message !== undefined &&
            data.message.includes("Unauthorized")
        ) {
            AuthServices.logoutUser(Utils.getStore("user"))
                .then((response) => {
                    console.log(response);

                    Utils.removeItem("user");
                    //Router.push({ name: "login" }); NEED THE ROUTER
                })
                .catch((err) => {
                    console.log("Error: " + err);
                });
        }

        return data;
    },
});

export default apiClient;
