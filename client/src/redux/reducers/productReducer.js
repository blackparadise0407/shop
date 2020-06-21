import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    PRODUCTS_LOADING,
    PRODUCTS_FAIL,
    GET_SINGLE_PRODUCT,
    ADD_FAIL,
    UPDATE_SUCCESS,
    UPDATE_FAIL
} from '../actions/types';
const initialState = {
    isLoading: false,
    payload: {
        products: null,
        product: null
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_SINGLE_PRODUCT:
            return {
                ...state,
                payload: {
                    product: action.payload
                },
                isLoading: false
            }
        case GET_PRODUCTS:
            return {
                ...state,
                payload: {
                    products: action.payload
                },
                isLoading: false
            }
        case PRODUCTS_FAIL:
            return {
                ...state,
                payload: {
                    products: null,
                    product: null
                },
                isLoading: false
            }
        case ADD_PRODUCT:
            return {
                ...state,
                isLoading: false,
                status: action.payload,
            }
        case ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case UPDATE_SUCCESS:
            return {

                ...state,
                status: action.payload,
                isLoading: false,
            }
        case UPDATE_FAIL:
            return {
                ...state,
                payload: {
                    products: null,
                    product: null
                },
                isLoading: false,
            }
        default:
            return state;
    }
}