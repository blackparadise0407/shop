import { GET_PRODUCTS, ADD_PRODUCT, PRODUCTS_LOADING, PRODUCTS_FAIL } from '../actions/types';
const initialState = {
    isLoading: false,
    payload: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_PRODUCTS:
            return {
                ...state,
                payload: action.payload,
                isLoading: false
            }
        case PRODUCTS_FAIL:
            return {
                ...state,
                payload: null,
                isLoading: false
            }
        // case ADD_PRODUCT:
        //     return {
        //         ...state
        //     }


        default:
            return state;
    }
}