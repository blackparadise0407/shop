import { GET_ERROR, CLEAR_ERROR } from '../actions/types';
const initialState = {
    msg: "",
    status: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ERROR:
            return {
                msg: action.payload.msg,
                status: action.payload.status
            }
        case CLEAR_ERROR:
            return {
                msg: "",
                status: null
            }
        default:
            return state;
    }
}