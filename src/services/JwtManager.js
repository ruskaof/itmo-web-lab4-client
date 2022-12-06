import {BASE_URL} from "./ApplicationService.js";

export const JwtManager = {
    /**
     * Used to get jwt tokens and save them to the local storage
     * @param username
     * @param password
     * @returns {Promise<any>}
     */
    login(username, password) {
        console.log("JwtManager.login with username: " + username + " and password: " + password);
        const body = JSON.stringify({'username': username, 'password': password});
        console.log('JwtManager.login', body);
        return fetch(`${BASE_URL}/login`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: body
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                return data;
            })
            .catch(error => {
                console.log(error);
            })
    },
    refreshAccessToken() {
        return fetch(`${BASE_URL}/api/user/token/refresh`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
            }
        }).then(response => response.json())
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                return data;
            })
            .catch(error => {
                console.log(error);
            })

    },
    getCurrentAccessToken() {
        return localStorage.getItem('access_token');
    }
}