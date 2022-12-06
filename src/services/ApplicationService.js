import {JwtManager} from "./JwtManager.js";

export const BASE_URL = 'http://localhost:8080/api';

export const ApplicationService = {
    addAttempt: async function (attempt) {
        let body = JSON.stringify(attempt)
        console.log('ApplicationService.addAttempt', body);
        //await sleep(1000); // TODO: remove it
        return fetch(`${BASE_URL}/add`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${JwtManager.getCurrentAccessToken()}`
            }, body: body
        })
            .then(response => {
                return response.json();
            })

    }, removeAllAttempts: async function () {
        await sleep(1000); // TODO: remove it
        console.log('ApplicationService.removeAllAttempts');
        return fetch(`${BASE_URL}/delete_all`, {
            method: 'DELETE', headers: {
                'Authorization': `Bearer ${JwtManager.getCurrentAccessToken()}`
            }
        })
    }, getAttemptsWithOffset: async function (offset, count) {
        await sleep(1000); // TODO: remove it
        console.log('ApplicationService.getAttemptsWithOffset', offset, count);
        return fetch(`${BASE_URL}/get_with_offset?offset=${offset}&size=${count}`, {
            method: 'GET', headers: {
                'Authorization': `Bearer ${JwtManager.getCurrentAccessToken()}`
            }
        })
            .then(response => response.json())
    }, getRowsCount() {
        return fetch(`${BASE_URL}/get_count`, {
            method: 'GET', headers: {
                'Authorization': `Bearer ${JwtManager.getCurrentAccessToken()}`
            }
        })
            .then(response => response.json())
    },
    login(username, password) {
        return JwtManager.login(username, password);
    }
}

// I need it to simulate a delay in the response from the server
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}