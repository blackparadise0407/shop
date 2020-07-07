import axios from 'axios';
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
} from './types';
import authApi from '../../api/authApi';
import { returnErr } from './errorAction';

export const clearRegMsg = () => {
    return ({ type: CLEAR_REGISTER_MSG });
}


export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    try {
        const res = await axios.get("/api/users", tokenConfig(getState));
        dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
        dispatch(returnErr(err.response.data, err.response.status));
        dispatch({ type: AUTH_ERROR });
    }
}

export const registerUser = ({ firstName, lastName, email, password, repPassword }) => dispatch => {
    dispatch({ type: USER_LOADING })
    //ATTEMP TO REGISTER USER
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ firstName, lastName, email, password, repPassword });

    axios.post("/api/users/register", body, config)
        .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
        .catch(err => {
            dispatch(returnErr(err.response.data, err.response.status));
            dispatch({ type: REGISTER_FAIL })
        })
}

// export const loginUser = ({ email, password }) => dispatch => {
//     dispatch({ type: USER_LOADING })
//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         }
//     }
//     const body = JSON.stringify({ email, password })
//     axios.post("/api/users/login", body, config)
//         .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
//         .catch(err => {
//             dispatch(returnErr(err.response.data, err.response.status));
//             dispatch({ type: LOGIN_FAIL })
//         })
// } Down below is the same request but using axiosClient

export const loginUser = ({ email, password }) => async dispatch => {
    dispatch({ type: USER_LOADING })
    const body = JSON.stringify({ email, password })
    try {
        const resp = await authApi.postLogin(body);
        dispatch({ type: LOGIN_SUCCESS, payload: resp })
    } catch (e) {
        dispatch(returnErr(e.response.data, e.response.status));
        dispatch({ type: LOGIN_FAIL })
    }

}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const tokenConfig = getState => {
    const token = getState().auth.token || localStorage.getItem('token');
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