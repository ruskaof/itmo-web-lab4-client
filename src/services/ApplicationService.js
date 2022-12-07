import {JwtManager} from "./JwtManager.js";

export const BASE_URL = 'http://localhost:8080/api';

export const ApplicationService = {
    addAttempt: async function (attempt) {
        let body = JSON.stringify(attempt)
        console.log('ApplicationService.addAttempt', body);
        await sleep(1000); // TODO: remove it
        return fetch(`${BASE_URL}/add`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${JwtManager.getCurrentAccessToken()}`
            }, body: body
        })
            .then(response => {
                if (response.status === 403) {
                    console.log("Access token expired, trying to refresh it");
                    return JwtManager.refreshAccessToken()
                        .then(() => {
                            return this.addAttempt(attempt);
                        })
                } else {
                    return response
                }
            })


    }, removeAllAttempts: async function () {
        await sleep(1000); // TODO: remove it
        console.log('ApplicationService.removeAllAttempts');
        return fetch(`${BASE_URL}/delete_all`, {
            method: 'DELETE', headers: {
                'Authorization': `Bearer ${JwtManager.getCurrentAccessToken()}`
            }
        })
            .then(response => {
                if (response.status === 403) {
                    return JwtManager.refreshAccessToken()
                        .then(() => {
                            return this.removeAllAttempts();
                        })
                } else {
                    return response
                }
            })
    }, getAttemptsWithOffset: async function (offset, count) {
        await sleep(1000); // TODO: remove it
        console.log('ApplicationService.getAttemptsWithOffset', offset, count, "using access token: " + JwtManager.getCurrentAccessToken());
        return fetch(`${BASE_URL}/get_with_offset?offset=${offset}&size=${count}`, {
            method: 'GET', headers: {
                'Authorization': `Bearer ${JwtManager.getCurrentAccessToken()}`
            }
        })
            .then(response => {
                if (response.status === 403) {
                    console.log("Access token expired, trying to refresh it");
                    return JwtManager.refreshAccessToken()
                        .then(() => {
                            return this.getAttemptsWithOffset(offset, count);
                        })
                } else {
                    return response
                }
            })

    }, getRowsCount: async function () {
        await sleep(1000); // TODO: remove it
        return fetch(`${BASE_URL}/get_count`, {
            method: 'GET', headers: {
                'Authorization': `Bearer ${JwtManager.getCurrentAccessToken()}`
            }
        })
            .then(response => {
                if (response.status === 403) {
                    console.log("Access token expired, trying to refresh it");
                    return JwtManager.refreshAccessToken()
                        .then(() => {
                            return this.getRowsCount();
                        })
                } else {
                    return response
                }
            })

    }, login: async function (username, password) {
        return JwtManager.login(username, password);
    }, register: async function (username, password) {
        await sleep(1000); // TODO: remove it
        return fetch(`${BASE_URL}/user/save`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
                // Do not add Authorization header here
            }, body: JSON.stringify({username: username, password: password})
        })
            .then(response => {
                if (response.status === 200) {
                    return true;
                } else if (response.status === 409) {
                    return false;
                } else {
                    console.log("Unexpected response status: " + response.status);
                }
            })

    }
}

// I need it to simulate a delay in the response from the server
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}