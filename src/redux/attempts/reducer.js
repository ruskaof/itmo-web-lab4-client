import {
    FETCH_ADD_ATTEMPT_FAILURE,
    FETCH_ADD_ATTEMPT_REQUEST,
    FETCH_ADD_ATTEMPT_SUCCESS,
    FETCH_ATTEMPTS_FAILURE,
    FETCH_ATTEMPTS_REQUEST,
    FETCH_ATTEMPTS_SUCCESS,
    FETCH_ATTEMPTS_WITH_OFFSET_FAILURE,
    FETCH_ATTEMPTS_WITH_OFFSET_REQUEST,
    FETCH_ATTEMPTS_WITH_OFFSET_SUCCESS,
    FETCH_DELETE_ALL_ATTEMPTS_FAILURE,
    FETCH_DELETE_ALL_ATTEMPTS_REQUEST,
    FETCH_DELETE_ALL_ATTEMPTS_SUCCESS
} from "./actions.js";

const initialState = {
    loading: false,
    errorMessage: '',
    attemptsList: [],
    offset: 0,
    nRows: 0,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ATTEMPTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_ATTEMPTS_SUCCESS:
            return {
                loading: false,
                attemptsList: action.payload,
                errorMessage: '',
            }
        case FETCH_ATTEMPTS_FAILURE:
            return {
                loading: false,
                attemptsList: [],
                errorMessage: action.payload,
            }
        case FETCH_ADD_ATTEMPT_SUCCESS:
            return {
                ...state,
                attemptsList: action.payload, // todo: optimize
            }
        case FETCH_ADD_ATTEMPT_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
            }
        case FETCH_ADD_ATTEMPT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_DELETE_ALL_ATTEMPTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_DELETE_ALL_ATTEMPTS_SUCCESS:
            return {
                ...state,
                loading: false,
                attemptsList: action.payload,
            }
        case FETCH_DELETE_ALL_ATTEMPTS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
            }
        case FETCH_ATTEMPTS_WITH_OFFSET_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_ATTEMPTS_WITH_OFFSET_SUCCESS:
            return {
                ...state,
                loading: false,
                attemptsList: action.payload.attempts,
                nRows: action.payload.attemptsCount,
                offset: action.payload.offset,
            }
        case FETCH_ATTEMPTS_WITH_OFFSET_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}