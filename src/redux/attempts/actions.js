import {ApplicationService} from "../../service/ApplicationService.js";

export const FETCH_ADD_ATTEMPT_REQUEST = 'FETCH_ADD_ATTEMPT_REQUEST';
export const FETCH_ADD_ATTEMPT_SUCCESS = 'FETCH_ADD_ATTEMPT_SUCCESS';
export const FETCH_ADD_ATTEMPT_FAILURE = 'FETCH_ADD_ATTEMPT_FAILURE';

export const fetchAddAttempt = (attempt) => {
    return function (dispatch) {
        dispatch(fetchAddAttemptRequest());
        ApplicationService.addAttempt(attempt)
            .then(response => {
                return response.json();
            })
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
        type: FETCH_ADD_ATTEMPT_SUCCESS, payload: attempt,
    }
}

const fetchAddAttemptFailure = errorMessage => {
    return {
        type: FETCH_ADD_ATTEMPT_FAILURE, payload: errorMessage,
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
        type: FETCH_DELETE_ALL_ATTEMPTS_FAILURE, payload: errorMessage,
    }
}

export const FETCH_ATTEMPTS_WITH_OFFSET_REQUEST = 'FETCH_ATTEMPTS_WITH_OFFSET_REQUEST';
export const FETCH_ATTEMPTS_WITH_OFFSET_SUCCESS = 'FETCH_ATTEMPTS_WITH_OFFSET_SUCCESS';
export const FETCH_ATTEMPTS_WITH_OFFSET_FAILURE = 'FETCH_ATTEMPTS_WITH_OFFSET_FAILURE';

export const fetchAttemptsWithOffset = (offset, count, searchParams) => {
    return function (dispatch) {
        dispatch(fetchAttemptsWithOffsetRequest());
        ApplicationService.getAttemptsWithOffset(offset, count, searchParams)
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
        type: FETCH_ATTEMPTS_WITH_OFFSET_SUCCESS, payload: data,
    }
}

const fetchAttemptsWithOffsetFailure = errorMessage => {
    return {
        type: FETCH_ATTEMPTS_WITH_OFFSET_FAILURE, payload: errorMessage,
    }
}


export const SET_X = 'SET_X';

export const setX = (x) => {
    return {
        type: SET_X, payload: x,
    }
}

export const SET_Y = 'SET_Y';

export const setY = (y) => {
    return {
        type: SET_Y, payload: y,
    }
}

export const SET_R = 'SET_R';

export const setR = (r) => {
    return {
        type: SET_R, payload: r,
    }
}

export const SET_FORM_ERROR = 'SET_FORM_ERROR';

export const setFormError = (message) => {
    return {
        type: SET_FORM_ERROR, payload: message,
    }
}

export const GET_ROWS_COUNT_REQUEST = 'GET_ROWS_COUNT_REQUEST';
export const GET_ROWS_COUNT_SUCCESS = 'GET_ROWS_COUNT_SUCCESS';
export const GET_ROWS_COUNT_FAILURE = 'GET_ROWS_COUNT_FAILURE';

export const getRowsCount = () => {
    return function (dispatch) {
        dispatch(getRowsCountRequest());
        ApplicationService.getRowsCount()
            .then(response => response.json())
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
        type: GET_ROWS_COUNT_SUCCESS, payload: count,
    }
}

const getRowsCountFailure = errorMessage => {
    return {
        type: GET_ROWS_COUNT_FAILURE, payload: errorMessage,
    }
}

/* Login page actions */

export const SET_LOGIN_FORM_USERNAME = 'SET_LOGIN_FORM_USERNAME';
export const SET_LOGIN_FORM_PASSWORD = 'SET_LOGIN_FORM_PASSWORD';

export const setLoginFormUsername = (username) => {
    return {
        type: SET_LOGIN_FORM_USERNAME, payload: username,
    }
}

export const setLoginFormPassword = (password) => {
    return {
        type: SET_LOGIN_FORM_PASSWORD, payload: password,
    }
}

export const SET_LOGGINED_IN = 'SET_LOGGINED_IN';

export const setLogginedIn = (logginedIn) => {
    return {
        type: SET_LOGGINED_IN, payload: logginedIn,
    }
}

export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';

export const fetchLogin = (username, password) => {
    return function (dispatch) {
        dispatch(fetchLoginRequest());
        ApplicationService.login(username, password)
            .then((result) => {
                if (result) {
                    dispatch(fetchLoginSuccess());
                } else {
                    dispatch(fetchLoginFailure("Wrong username or password"));
                }
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
        type: FETCH_LOGIN_FAILURE, payload: errorMessage,
    }
}

export const SET_REGISTER_FORM_PASSWORD = 'SET_REGISTER_FORM_PASSWORD';
export const SET_REGISTER_FORM_PASSWORD_REPEAT = 'SET_REGISTER_FORM_PASSWORD_REPEAT';
export const SET_REGISTER_FORM_USERNAME = 'SET_REGISTER_FORM_USERNAME';

export const setRegisterFormPassword = (password) => {
    return {
        type: SET_REGISTER_FORM_PASSWORD, payload: password,
    }
}

export const setRegisterFormPasswordRepeat = (passwordRepeat) => {
    return {
        type: SET_REGISTER_FORM_PASSWORD_REPEAT, payload: passwordRepeat,
    }
}

export const setRegisterFormUsername = (username) => {
    return {
        type: SET_REGISTER_FORM_USERNAME, payload: username,
    }
}

export const FETCH_REGISTER_REQUEST = 'FETCH_REGISTER_REQUEST';
export const FETCH_REGISTER_SUCCESS = 'FETCH_REGISTER_SUCCESS';
export const FETCH_REGISTER_FAILURE = 'FETCH_REGISTER_FAILURE';

export const fetchRegister = (username, password) => {
    return function (dispatch) {
        dispatch(fetchRegisterRequest());
        ApplicationService.register(username, password)
            .then((result) => {
                if (result) {
                    dispatch(fetchRegisterSuccess());
                } else {
                    dispatch(fetchRegisterFailure("User with such username already exists"));
                }
            })
            .catch(error => {
                dispatch(fetchRegisterFailure(error.message));
            })
    }
}

const fetchRegisterRequest = () => {
    return {
        type: FETCH_REGISTER_REQUEST,
    }
}

const fetchRegisterSuccess = () => {
    return {
        type: FETCH_REGISTER_SUCCESS,
    }
}

const fetchRegisterFailure = errorMessage => {
    return {
        type: FETCH_REGISTER_FAILURE, payload: errorMessage,
    }
}

export const FETCH_ATTEMPTS_WITH_OFFSET_SEARCH_REQUEST = 'FETCH_ATTEMPTS_WITH_OFFSET_SEARCH_REQUEST';
export const FETCH_ATTEMPTS_WITH_OFFSET_SEARCH_SUCCESS = 'FETCH_ATTEMPTS_WITH_OFFSET_SEARCH_SUCCESS';
export const FETCH_ATTEMPTS_WITH_OFFSET_SEARCH_FAILURE = 'FETCH_ATTEMPTS_WITH_OFFSET_SEARCH_FAILURE';

export const fetchAttemptsWithOffsetSearch = (offset, count, searchParams) => {
    return function (dispatch) {
        dispatch(fetchAttemptsWithOffsetSearchRequest());
        ApplicationService.getAttemptsWithOffset(offset, count, searchParams)
            .then((result) => {
                dispatch(fetchAttemptsWithOffsetSearchSuccess(result));
            })
            .catch(error => {
                dispatch(fetchAttemptsWithOffsetSearchFailure(error.message));
            })
    }
}

const fetchAttemptsWithOffsetSearchRequest = () => {
    return {
        type: FETCH_ATTEMPTS_WITH_OFFSET_SEARCH_REQUEST,
    }
}

const fetchAttemptsWithOffsetSearchSuccess = (result) => {
    return {
        type: FETCH_ATTEMPTS_WITH_OFFSET_SEARCH_SUCCESS, payload: result,
    }
}

const fetchAttemptsWithOffsetSearchFailure = errorMessage => {
    return {
        type: FETCH_ATTEMPTS_WITH_OFFSET_SEARCH_FAILURE, payload: errorMessage,
    }
}

export const SET_TABLE_ATTEMPTS_LIST = 'SET_TABLE_ATTEMPTS_LIST';

export const setTableAttemptsList = (attemptsList) => {
    return {
        type: SET_TABLE_ATTEMPTS_LIST, payload: attemptsList,
    }
}

export const SET_TABLE_HAS_MORE = 'SET_TABLE_HAS_MORE';

export const setTableHasMore = (hasNext) => {
    return {
        type: SET_TABLE_HAS_MORE, payload: hasNext,
    }
}

export const SET_REGISTER_FORM_ERROR = 'SET_REGISTER_FORM_ERROR';

export const setRegisterFormError = (errorMessage) => {
    return {
        type: SET_REGISTER_FORM_ERROR, payload: errorMessage,
    }
}

export const SET_LOGIN_FORM_ERROR = 'SET_LOGIN_FORM_ERROR';

export const setLoginFormError = (errorMessage) => {
    return {
        type: SET_LOGIN_FORM_ERROR, payload: errorMessage,
    }
}

export const SET_REGISTER_FORM_SUCCESS_MESSAGE = 'SET_REGISTER_FORM_SUCCESS_MESSAGE';

export const setRegisterFormSuccessMessage = (successMessage) => {
    return {
        type: SET_REGISTER_FORM_SUCCESS_MESSAGE, payload: successMessage,
    }
}

export const CLEAR_TABLE_CACHE = 'CLEAR_TABLE_CACHE';

export const clearTableCache = () => {
    return {
        type: CLEAR_TABLE_CACHE,
    }
}

/**
 * Why did I move this state to redux?
 * The thing is, the table can be updated from graph or the form during it's loading.
 * When the table is loading, we do not want to update it's state, because it will cause
 * the table to show irrelevant data. So, we store the data in redux, and when the table
 * is loading we prevent the user from updating the table.
 *
 * This approach is only works for one user experience.
 *
 * OC comment (by ruskaof)
 * @type {string}
 */
export const SET_NEXT_TABLE_PAGE_IS_LOADING = 'SET_NEXT_TABLE_PAGE_IS_LOADING';

export const setNextTablePageIsLoading = (isLoading) => {
    return {
        type: SET_NEXT_TABLE_PAGE_IS_LOADING, payload: isLoading,
    }
}

export const MAKE_TABLE_SEARCH = "MAKE_TABLE_SEARCH"
