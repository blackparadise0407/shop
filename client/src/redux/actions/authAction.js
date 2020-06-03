import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    AUTH_ERROR
} from './types';
import { returnErr } from './errorAction'


export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    axios.get("/api/users", tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErr(err.response.data, err.response.status));
            dispatch({ type: AUTH_ERROR })
        })

}

export const registerUser = ({ firstName, lastName, email, password }) => dispatch => {
    //ATTEMP TO REGISTER USER
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ firstName, lastName, email, password });

    axios.post("/api/users/register", body, config)
        .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
        .catch(err => {
            dispatch(returnErr(err.response.data, err.response.status));
            dispatch({ type: REGISTER_FAIL })
        })
}

export const loginUser = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })
    axios.post("/api/users/login", body, config)
        .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
        .catch(err => {
            dispatch(returnErr(err.response.data, err.response.status));
            dispatch({ type: LOGIN_FAIL })
        })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    if (token) {
        config.headers['auth-token'] = token;
    }
    return config;
}