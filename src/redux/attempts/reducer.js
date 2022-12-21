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
    SET_TABLE_ATTEMPTS_LIST,
    SET_TABLE_HAS_MORE,
    SET_LOGGINED_IN,
    SET_REGISTER_FORM_ERROR,
    SET_LOGIN_FORM_ERROR,
    SET_REGISTER_FORM_SUCCESS_MESSAGE,
    CLEAR_TABLE_CACHE, SET_NEXT_TABLE_PAGE_IS_LOADING,
} from "./actions.js";
import {JwtManager} from "../../service/JwtManager.js";

const initialState = {
    loading: false,
    serverErrorMessage: '',
    attemptsList: [],
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
    loggedIn: JwtManager.userIsLoggedIn(), // Initial value is set due to the data in the local storage
    authFormIsLoading: false,
    tableNextPageIsLoading: false,
    tableHasMore: true,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADD_ATTEMPT_SUCCESS:
            return {
                ...state, attemptsList: [...state.attemptsList, action.payload], tableHasMore: true
            }
        case FETCH_ADD_ATTEMPT_FAILURE:
            return {
                ...state, errorMessage: action.payload,
            }
        case FETCH_ADD_ATTEMPT_REQUEST:

            return {
                ...state, loading: true,
            }
        case FETCH_DELETE_ALL_ATTEMPTS_REQUEST:
            return {
                ...state, loading: true,
            }
        case FETCH_DELETE_ALL_ATTEMPTS_SUCCESS:
            return {
                ...state, loading: false, attemptsList: [], tableAttemptsList: [],
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
            return {
                ...state,
                loading: false,
                attemptsList: action.payload.attempts,
                tableDataHasMore: action.payload.has_more
            }
        case FETCH_ATTEMPTS_WITH_OFFSET_FAILURE:
            return {
                ...state, loading: false, errorMessage: action.payload,
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
            return {
                ...state, authFormIsLoading: false, loginFormErrorMessage: '', loggedIn: true
            }
        case FETCH_LOGIN_FAILURE:
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
                ...state,
                authFormIsLoading: false,
                registerFormSuccessMessage: 'The user has been successfully registered',
                registerFormErrorMessage: ''
            }
        case FETCH_REGISTER_FAILURE:
            return {
                ...state,
                authFormIsLoading: false,
                registerFormErrorMessage: action.payload,
                registerFormSuccessMessage: ''
            }
        case SET_TABLE_ATTEMPTS_LIST:
            return {
                ...state, tableAttemptsList: action.payload,
            }
        case SET_TABLE_HAS_MORE:
            return {
                ...state, tableHasMore: action.payload,
            }
        case SET_LOGGINED_IN:
            return {
                ...state, loggedIn: action.payload,
            }
        case SET_REGISTER_FORM_ERROR: {
            return {
                ...state, registerFormErrorMessage: action.payload,
            }
        }
        case SET_LOGIN_FORM_ERROR: {
            return {
                ...state, loginFormErrorMessage: action.payload,
            }
        }
        case SET_REGISTER_FORM_SUCCESS_MESSAGE: {
            return {
                ...state, registerFormSuccessMessage: action.payload,
            }
        }
        case CLEAR_TABLE_CACHE: {
            return {
                ...state, tableAttemptsList: [],
            }
        }
        case SET_NEXT_TABLE_PAGE_IS_LOADING: {
            return {
                ...state, tableNextPageIsLoading: action.payload,
            }
        }



        default:
            return state;
    }
}

