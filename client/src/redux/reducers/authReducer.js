import {
    USER_LOADED,
    USER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    AUTH_ERROR,
    CLEAR_REGISTER_MSG
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    isLoading: false,
    token: localStorage.getItem('token'),
    user: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case CLEAR_REGISTER_MSG:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                msg: null
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading: false,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                msg: null
            }
        default:
            return state;
    }
} 