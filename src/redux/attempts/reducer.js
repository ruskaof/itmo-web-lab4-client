import {
    FETCH_ADD_ATTEMPT_FAILURE,
    FETCH_ADD_ATTEMPT_REQUEST,
    FETCH_ADD_ATTEMPT_SUCCESS,
    FETCH_ATTEMPTS_WITH_OFFSET_FAILURE,
    FETCH_ATTEMPTS_WITH_OFFSET_REQUEST,
    FETCH_ATTEMPTS_WITH_OFFSET_SUCCESS,
    FETCH_DELETE_ALL_ATTEMPTS_FAILURE,
    FETCH_DELETE_ALL_ATTEMPTS_REQUEST,
    FETCH_DELETE_ALL_ATTEMPTS_SUCCESS,
    GET_ROWS_COUNT_FAILURE,
    GET_ROWS_COUNT_REQUEST,
    GET_ROWS_COUNT_SUCCESS,
    SET_LOGIN_FORM_PASSWORD,
    SET_FORM_ERROR,
    SET_R,
    SET_SCROLL_START,
    SET_X,
    SET_Y,
    SET_LOGIN_FORM_USERNAME,
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    SET_REGISTER_FORM_PASSWORD,
    SET_REGISTER_FORM_PASSWORD_REPEAT,
    SET_REGISTER_FORM_USERNAME,
    FETCH_REGISTER_REQUEST,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_FAILURE,
    SET_TABLE_SEARCH_ID,
    SET_TABLE_SEARCH_X,
    SET_TABLE_SEARCH_Y,
    SET_TABLE_SEARCH_R,
    SET_TABLE_SEARCH_RESULT,
    SET_TABLE_SEARCH_TIME,
    SET_TABLE_SEARCH_PROCESSING_TIME,
} from "./actions.js";

const initialState = {
    loading: false,
    serverErrorMessage: '',
    attemptsList: [],
    nRows: 100,
    tableScrollStart: 0,
    currentEnteredX: 0,
    currentEnteredY: 0,
    currentEnteredR: 1,
    formErrorMessage: '',
    loginFormUsername: '',
    loginFormPassword: '',
    loginFormErrorMessage: '',
    loginFormSuccessMessage: '',
    registerFormUsername: '',
    registerFormPassword: '',
    registerFormPasswordRepeat: '',
    registerFormErrorMessage: '',
    registerFormSuccessMessage: '',
    loggedIn: false,
    authFormIsLoading: false,
    tableSearchId: '',
    tableSearchX: '',
    tableSearchY: '',
    tableSearchR: '',
    tableSearchResult: '',
    tableSearchTime: '',
    tableSearchProcessingTime: '',
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADD_ATTEMPT_SUCCESS:
            return {
                ...state, attemptsList: [...state.attemptsList, action.payload], nRows: state.nRows + 1,
            }
        case FETCH_ADD_ATTEMPT_FAILURE:
            console.log('reducer.FETCH_ADD_ATTEMPT_FAILURE:' + action.payload);
            return {
                ...state, errorMessage: action.payload,
            }
        case FETCH_ADD_ATTEMPT_REQUEST:
            console.log('reducer.FETCH_ADD_ATTEMPT_REQUEST: ' + action.payload);
            return {
                ...state, loading: true,
            }
        case FETCH_DELETE_ALL_ATTEMPTS_REQUEST:
            return {
                ...state, loading: true,
            }
        case FETCH_DELETE_ALL_ATTEMPTS_SUCCESS:
            return {
                ...state, loading: false, attemptsList: [], nRows: 0, tableScrollStart: 0,
            }
        case FETCH_DELETE_ALL_ATTEMPTS_FAILURE:
            return {
                ...state, loading: false, errorMessage: action.payload,
            }
        case FETCH_ATTEMPTS_WITH_OFFSET_REQUEST:
            return {
                ...state, loading: true,
            }
        case FETCH_ATTEMPTS_WITH_OFFSET_SUCCESS:
            console.log('FETCH_ATTEMPTS_WITH_OFFSET_SUCCESS: ', action.payload);
            return {
                ...state,
                loading: false,
                attemptsList: action.payload.attempts || state.attemptsList,
                nRows: action.payload.attemptsCount || state.nRows,
            }
        case FETCH_ATTEMPTS_WITH_OFFSET_FAILURE:
            return {
                ...state, loading: false, errorMessage: action.payload,
            }
        case SET_SCROLL_START:
            return {
                ...state, tableScrollStart: action.payload,
            }
        case SET_X:
            return {
                ...state, currentEnteredX: action.payload,
            }
        case SET_Y:
            return {
                ...state, currentEnteredY: action.payload,
            }
        case SET_R:
            return {
                ...state, currentEnteredR: action.payload,
            }
        case SET_FORM_ERROR:
            return {
                ...state, formErrorMessage: action.payload,
            }
        case GET_ROWS_COUNT_REQUEST:
            return {
                ...state, loading: true,
            }
        case GET_ROWS_COUNT_FAILURE:
            return {
                ...state, loading: false, errorMessage: action.payload,
            }
        case GET_ROWS_COUNT_SUCCESS:
            return {
                ...state, loading: false, nRows: action.payload,
            }
        case SET_LOGIN_FORM_PASSWORD:
            return {
                ...state, loginFormPassword: action.payload,
            }
        case SET_LOGIN_FORM_USERNAME:
            return {
                ...state, loginFormUsername: action.payload,
            }
        case FETCH_LOGIN_REQUEST:
            return {
                ...state, authFormIsLoading: true,
            }
        case FETCH_LOGIN_SUCCESS:
            console.log('FETCH_LOGIN_SUCCESS: ', action.payload);
            return {
                ...state, authFormIsLoading: false, loginFormErrorMessage: '', loggedIn: true
            }
        case FETCH_LOGIN_FAILURE:
            console.log('FETCH_LOGIN_FAILURE: ' + action.payload);
            return {
                ...state, authFormIsLoading: false, loginFormErrorMessage: action.payload,
            }
        case SET_REGISTER_FORM_PASSWORD:
            return {
                ...state, registerFormPassword: action.payload,
            }
        case SET_REGISTER_FORM_PASSWORD_REPEAT:
            return {
                ...state, registerFormPasswordRepeat: action.payload,
            }
        case SET_REGISTER_FORM_USERNAME:
            return {
                ...state, registerFormUsername: action.payload,
            }
        case FETCH_REGISTER_REQUEST:
            return {
                ...state, authFormIsLoading: true,
            }
        case FETCH_REGISTER_SUCCESS:
            return {
                ...state, authFormIsLoading: false
            }
        case FETCH_REGISTER_FAILURE:
            return {
                ...state, authFormIsLoading: false, registerFormErrorMessage: action.payload,
            }
        case SET_TABLE_SEARCH_ID:
            return {
                ...state, tableSearchId: action.payload,
            }
        case SET_TABLE_SEARCH_X:
            return {
                ...state, tableSearchX: action.payload,
            }
        case SET_TABLE_SEARCH_Y:
            return {
                ...state, tableSearchY: action.payload,
            }
        case SET_TABLE_SEARCH_R:
            return {
                ...state, tableSearchR: action.payload,
            }
        case SET_TABLE_SEARCH_RESULT:
            return {
                ...state, tableSearchResult: action.payload,
            }
        case SET_TABLE_SEARCH_TIME:
            return {
                ...state, tableSearchTime: action.payload,
            }
        case SET_TABLE_SEARCH_PROCESSING_TIME:
            return {
                ...state, tableSearchProcessingTime: action.payload,
            }


        default:
            return state;
    }
}

