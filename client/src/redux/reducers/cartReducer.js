import {
    ADDCART_FAIL,
    ADDCART_SUCCESS,
    CART_LOADED,
    CART_LOADING,
    REMOVECART_SUCCESS
} from '../actions/types';

const initialState = {
    isLoading: null,
    payload: [],
    totalPrice: 0,
    totalItem: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CART_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case CART_LOADED:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        case ADDCART_SUCCESS:
            return {
                ...state,
                payload: action.payload,
                isLoading: false,
                totalPrice: action.totalPrice,
                totalItem: action.totalItem
            }
        case ADDCART_FAIL:
            return {
                ...state,
                payload: [],
                isLoading: false
            }
        case REMOVECART_SUCCESS:
            return {
                ...state,
                payload: action.payload,
                totalPrice: action.totalPrice,
                totalItem: action.totalItem,
                isLoading: false,
            }
        default:
            return state;
    }
}