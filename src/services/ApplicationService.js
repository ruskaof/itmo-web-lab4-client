const BASE_URL = 'http://localhost:8080/api';

export const ApplicationService = {
    addAttempt: async function (attempt) {
        let body = JSON.stringify(attempt)
        console.log('ApplicationService.addAttempt', body);
        return fetch(`${BASE_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        })

    },
    getAllAttempts: async function () {
        console.log('ApplicationService.getAllAttempts');
        return fetch(`${BASE_URL}/get_all`, {
            method: 'GET',
        })
            .then(response => response.json())
    },
    removeAllAttempts: async function () {
        console.log('ApplicationService.removeAllAttempts');
        return fetch(`${BASE_URL}/delete_all`, {
            method: 'DELETE',
        })
    },
    getAttemptsWithOffset: async function (offset, count) {
        console.log('ApplicationService.getAttemptsWithOffset', offset, count);
        return fetch(`${BASE_URL}/get_with_offset?offset=${offset}&size=${count}`, {
            method: 'GET',
        })
            .then(response => response.json())
    }
}