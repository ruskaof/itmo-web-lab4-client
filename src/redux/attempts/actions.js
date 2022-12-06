import {ApplicationService} from "../../services/ApplicationService.js";

// export const FETCH_ATTEMPTS_REQUEST = 'FETCH_ATTEMPTS_REQUEST';
// export const FETCH_ATTEMPTS_SUCCESS = 'FETCH_ATTEMPTS_SUCCESS';
// export const FETCH_ATTEMPTS_FAILURE = 'FETCH_ATTEMPTS_FAILURE';
//
// export const fetchAttempts = () => {
//     return function (dispatch) {
//         dispatch(fetchAttemptsRequest());
//         ApplicationService.getAllAttempts()
//             .then(data => {
//                 dispatch(fetchAttemptsSuccess(data));
//             })
//             .catch(error => {
//                     dispatch(fetchAttemptsFailure(error.message));
//                 }
//             )
//     }
// }
//
// const fetchAttemptsRequest = () => {
//     return {
//         type: FETCH_ATTEMPTS_REQUEST,
//     }
// }
//
// const fetchAttemptsSuccess = attemptsList => {
//     return {
//         type: FETCH_ATTEMPTS_SUCCESS,
//         payload: attemptsList,
//     }
// }
//
// const fetchAttemptsFailure = errorMessage => {
//     return {
//         type: FETCH_ATTEMPTS_FAILURE,
//         payload: errorMessage,
//     }
// }

export const FETCH_ADD_ATTEMPT_REQUEST = 'FETCH_ADD_ATTEMPT_REQUEST';
export const FETCH_ADD_ATTEMPT_SUCCESS = 'FETCH_ADD_ATTEMPT_SUCCESS';
export const FETCH_ADD_ATTEMPT_FAILURE = 'FETCH_ADD_ATTEMPT_FAILURE';

export const fetchAddAttempt = (attempt) => {
    return function (dispatch) {
        dispatch(fetchAddAttemptRequest());
        ApplicationService.addAttempt(attempt)
            .then((newAttempt) => {
                dispatch(fetchAddAttemptSuccess(newAttempt));
            })
            .catch(error => {
                dispatch(fetchAddAttemptFailure(error.message));
            })
    }
}

const fetchAddAttemptRequest = () => {
    return {
        type: FETCH_ADD_ATTEMPT_REQUEST,
    }
}

const fetchAddAttemptSuccess = attempt => {
    return {
        type: FETCH_ADD_ATTEMPT_SUCCESS,
        payload: attempt,
    }
}

const fetchAddAttemptFailure = errorMessage => {
    return {
        type: FETCH_ADD_ATTEMPT_FAILURE,
        payload: errorMessage,
    }
}

export const FETCH_DELETE_ALL_ATTEMPTS_REQUEST = 'FETCH_DELETE_ALL_ATTEMPTS_REQUEST';
export const FETCH_DELETE_ALL_ATTEMPTS_SUCCESS = 'FETCH_DELETE_ALL_ATTEMPTS_SUCCESS';
export const FETCH_DELETE_ALL_ATTEMPTS_FAILURE = 'FETCH_DELETE_ALL_ATTEMPTS_FAILURE';

export const fetchDeleteAllAttempts = () => {
    return function (dispatch) {
        dispatch(fetchDeleteAllAttemptsRequest());
        ApplicationService.removeAllAttempts()
            .then(() => {
                dispatch(fetchDeleteAllAttemptsSuccess());
            })
            .catch(error => {
                dispatch(fetchDeleteAllAttemptsFailure(error.message));
            })
    }
}

const fetchDeleteAllAttemptsRequest = () => {
    return {
        type: FETCH_DELETE_ALL_ATTEMPTS_REQUEST,
    }
}

const fetchDeleteAllAttemptsSuccess = () => {
    return {
        type: FETCH_DELETE_ALL_ATTEMPTS_SUCCESS,
    }
}

const fetchDeleteAllAttemptsFailure = errorMessage => {
    return {
        type: FETCH_DELETE_ALL_ATTEMPTS_FAILURE,
        payload: errorMessage,
    }
}

export const FETCH_ATTEMPTS_WITH_OFFSET_REQUEST = 'FETCH_ATTEMPTS_WITH_OFFSET_REQUEST';
export const FETCH_ATTEMPTS_WITH_OFFSET_SUCCESS = 'FETCH_ATTEMPTS_WITH_OFFSET_SUCCESS';
export const FETCH_ATTEMPTS_WITH_OFFSET_FAILURE = 'FETCH_ATTEMPTS_WITH_OFFSET_FAILURE';

export const fetchAttemptsWithOffset = (offset, count) => {
    return function (dispatch) {
        dispatch(fetchAttemptsWithOffsetRequest());
        ApplicationService.getAttemptsWithOffset(offset, count)
            .then(data => {
                dispatch(fetchAttemptsWithOffsetSuccess(data));
            })
            .catch(error => {
                dispatch(fetchAttemptsWithOffsetFailure(error.message));
                console.log(error.message);
            })
    }
}

const fetchAttemptsWithOffsetRequest = () => {
    return {
        type: FETCH_ATTEMPTS_WITH_OFFSET_REQUEST,
    }
}

const fetchAttemptsWithOffsetSuccess = data => {
    return {
        type: FETCH_ATTEMPTS_WITH_OFFSET_SUCCESS,
        payload: data,
    }
}

const fetchAttemptsWithOffsetFailure = errorMessage => {
    return {
        type: FETCH_ATTEMPTS_WITH_OFFSET_FAILURE,
        payload: errorMessage,
    }
}

export const SET_SCROLL_START = 'SET_SCROLL_START';

export const setScrollStart = (scrollStart) => {
    return {
        type: SET_SCROLL_START,
        payload: scrollStart,
    }
}

export const SET_X = 'SET_X';

export const setX = (x) => {
    return {
        type: SET_X,
        payload: x,
    }
}

export const SET_Y = 'SET_Y';

export const setY = (y) => {
    return {
        type: SET_Y,
        payload: y,
    }
}

export const SET_R = 'SET_R';

export const setR = (r) => {
    return {
        type: SET_R,
        payload: r,
    }
}

export const SET_FORM_ERROR = 'SET_FORM_ERROR';

export const setFormError = (message) => {
return {
        type: SET_FORM_ERROR,
        payload: message,
    }
}

export const GET_ROWS_COUNT_REQUEST = 'GET_ROWS_COUNT_REQUEST';
export const GET_ROWS_COUNT_SUCCESS = 'GET_ROWS_COUNT_SUCCESS';
export const GET_ROWS_COUNT_FAILURE = 'GET_ROWS_COUNT_FAILURE';

export const getRowsCount = () => {
    return function (dispatch) {
        dispatch(getRowsCountRequest());
        ApplicationService.getRowsCount()
            .then(count => {
                dispatch(getRowsCountSuccess(count));
            })
            .catch(error => {
                dispatch(getRowsCountFailure(error.message));
            })
    }
}

const getRowsCountRequest = () => {
    return {
        type: GET_ROWS_COUNT_REQUEST,
    }
}

const getRowsCountSuccess = count => {
    return {
        type: GET_ROWS_COUNT_SUCCESS,
        payload: count,
    }
}

const getRowsCountFailure = errorMessage => {
    return {
        type: GET_ROWS_COUNT_FAILURE,
        payload: errorMessage,
    }
}

/* Login page actions */

export const SET_LOGIN_FORM_USERNAME = 'SET_LOGIN_FORM_USERNAME';
export const SET_LOGIN_FORM_PASSWORD = 'SET_LOGIN_FORM_PASSWORD';

export const setLoginFormUsername = (username) => {
    return {
        type: SET_LOGIN_FORM_USERNAME,
        payload: username,
    }
}

export const setLoginFormPassword = (password) => {
    return {
        type: SET_LOGIN_FORM_PASSWORD,
        payload: password,
    }
}

export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';

export const fetchLogin = (username, password) => {
    console.log("fetchLogin with username: " + username + " and password: " + password);
    return function (dispatch) {
        dispatch(fetchLoginRequest());
        ApplicationService.login(username, password)
            .then(() => {
                console.log("Login success");
                dispatch(fetchLoginSuccess());
            })
            .catch(error => {
                dispatch(fetchLoginFailure(error.message));
            })
    }
}

const fetchLoginRequest = () => {
    return {
        type: FETCH_LOGIN_REQUEST,
    }
}

const fetchLoginSuccess = () => {
    return {
        type: FETCH_LOGIN_SUCCESS,
    }
}

const fetchLoginFailure = errorMessage => {
    return {
        type: FETCH_LOGIN_FAILURE,
        payload: errorMessage,
    }
}
