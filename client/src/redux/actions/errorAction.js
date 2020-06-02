import { GET_ERROR, CLEAR_ERROR } from './types';

export const returnErr = (msg, status) => {
    return {
        type: GET_ERROR,
        payload: { msg, status }
    }
}

export const clearErr = () => {
    return {
        type: CLEAR_ERROR
    }
}