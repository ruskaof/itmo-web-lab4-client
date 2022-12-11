import {BASE_URL} from "./ApplicationService.js";

export const JwtManager = {
    /**
     * Used to get jwt tokens and save them to the local storage
     * @param username
     * @param password
     * @returns {Promise<any>}
     */
    login(username, password) {
        const body = JSON.stringify({'username': username, 'password': password});
        return fetch(`${BASE_URL}/login`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: body
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    return Promise.reject("Invalid username or password");
                } else {
                    return Promise.reject("Invalid username or password");
                }
            })
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                return true;
            })
            .catch(error => {
                console.log(error);
                return false;
            })
    }, refreshAccessToken() {
        return fetch(`${BASE_URL}/user/token/refresh`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
            }
        }).then(response => response.json())
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                return data;
            })
            .catch(error => {
                console.log(error);
            })

    }, getCurrentAccessToken() {
        return localStorage.getItem('access_token');
    }, userIsLoggedIn() {
        return localStorage.getItem('access_token') !== null;
    }
}