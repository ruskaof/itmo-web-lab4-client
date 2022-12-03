import {ApplicationService} from "../../services/ApplicationService.js";

export const FETCH_ATTEMPTS_REQUEST = 'FETCH_ATTEMPTS_REQUEST';
export const FETCH_ATTEMPTS_SUCCESS = 'FETCH_ATTEMPTS_SUCCESS';
export const FETCH_ATTEMPTS_FAILURE = 'FETCH_ATTEMPTS_FAILURE';

export const fetchAttempts = () => {
    return function (dispatch) {
        dispatch(fetchAttemptsRequest());
        ApplicationService.getAllAttempts()
            .then(data => {
                dispatch(fetchAttemptsSuccess(data));
            })
            .catch(error => {
                    dispatch(fetchAttemptsFailure(error.message));
                }
            )
    }
}

const fetchAttemptsRequest = () => {
    return {
        type: FETCH_ATTEMPTS_REQUEST,
    }
}

const fetchAttemptsSuccess = attemptsList => {
    return {
        type: FETCH_ATTEMPTS_SUCCESS,
        payload: attemptsList,
    }
}

const fetchAttemptsFailure = errorMessage => {
    return {
        type: FETCH_ATTEMPTS_FAILURE,
        payload: errorMessage,
    }
}

export const FETCH_ADD_ATTEMPT_REQUEST = 'FETCH_ADD_ATTEMPT_REQUEST';
export const FETCH_ADD_ATTEMPT_SUCCESS = 'FETCH_ADD_ATTEMPT_SUCCESS';
export const FETCH_ADD_ATTEMPT_FAILURE = 'FETCH_ADD_ATTEMPT_FAILURE';

export const fetchAddAttempt = (attempt) => {
    return function (dispatch) {
        dispatch(fetchAddAttemptRequest());
        ApplicationService.addAttempt(attempt)
            .then(() => {
                return ApplicationService.getAllAttempts();
            })
            .then(data => {
                dispatch(fetchAddAttemptSuccess(data));
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
                return ApplicationService.getAllAttempts();
            })
            .then(data => {
                dispatch(fetchDeleteAllAttemptsSuccess(data));
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

const fetchDeleteAllAttemptsSuccess = attemptsList => {
    return {
        type: FETCH_DELETE_ALL_ATTEMPTS_SUCCESS,
        payload: attemptsList,
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