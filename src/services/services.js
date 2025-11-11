import axios from "axios";
import router from "../router.js";
import authServices from "./authServices.js";
import Utils from "../config/utils.js";

let baseURL = "";

if (import.meta.env.MODE === "development")
    baseURL = "http://localhost/tracker-t6/";
else baseURL = "/tracker-t6/";

const apiClient = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
        crossDomain: true,
    },
    transformRequest: (data, headers) => {
        const user = Utils.getStore("user");

        if (user != null) {
            const token = user.token;
            let authHeader = "";

            if (token != null && token != "") authHeader = "Bearer " + token;

            headers["Authorization"] = authHeader;
        }

        return JSON.stringify(data);
    },
    transformResponse: (data) => {
        data = JSON.parse(data);

        if (
            data.message !== undefined &&
            data.message.includes("Unauthorized")
        ) {
            authServices
                .logoutUser(Utils.getStore("user"))
                .then((response) => {
                    console.log(response);

                    Utils.removeItem("user");
                    router.push({ name: "login" });
                })
                .catch((err) => {
                    console.log("Error: " + err);
                });
        }

        return data;
    },
});

export default apiClient;
