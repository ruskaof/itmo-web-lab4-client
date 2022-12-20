import { BASE_URL } from "./ApplicationService.js";
import { store } from "../redux/attempts/store.js";
import { setLogginedIn } from "../redux/attempts/actions.js";

/**
 * This object is responsible for managing JWT tokens and user authentication.
 */
export const JwtManager = {
    /**
     * Used to get jwt tokens and save them to the local storage
     * @param username
     * @param password
     * @returns {Promise<any>}
     */
    login(username, password) {
        const body = JSON.stringify({ username: username, password: password });
        return fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    return Promise.reject("Invalid username or password");
                } else {
                    return Promise.reject("Invalid username or password");
                }
            })
            .then((data) => {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("username", username);
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    },
    /**
     * Used to refresh the access token
     * @returns new access token or null if there was an error
     */ refreshAccessToken() {
        const refresh_token = localStorage.getItem("refresh_token");
        if (refresh_token === null) {
            return Promise.reject("No refresh token");
        }
        return fetch(`${BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token: refresh_token }),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Failed to refresh access token");
                }
            })
            .then((data) => {
                localStorage.setItem("access_token", data.access_token);
                return data;
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    },
    getCurrentAccessToken() {
        return localStorage.getItem("access_token");
    },
    userIsLoggedIn() {
        return localStorage.getItem("username") !== null;
    },
    /**
     * Used to remove all tokens from the local storage and logout the user from the application
     */ logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("username");
        store.dispatch(setLogginedIn(false));
    },
};
