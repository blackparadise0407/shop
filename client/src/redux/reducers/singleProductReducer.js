import {
    GET_SINGLE_PRODUCTS,
    SINGLE_PRODUCT_LOADING,
    SINGLE_PRODUCT_FAIL
} from '../actions/types';

const initialState = {
    product: null,
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SINGLE_PRODUCT_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case GET_SINGLE_PRODUCTS:
            return {
                ...state,
                product: action.payload,
                isLoading: false,
            }
        case SINGLE_PRODUCT_FAIL:
            return {
                ...state,
                product: null,
                isLoading: false,
            }
        default:
            return state;
    }
}