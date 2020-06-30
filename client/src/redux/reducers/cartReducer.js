import {
    ADDCART_FAIL,
    ADDCART_SUCCESS,
    CART_LOADED,
    CART_LOADING,
    REMOVECART_SUCCESS,
    QTYCONTROL_FAIL,
    QTYCONTROL_SUCCESS,
    CART_EMPTY
} from '../actions/types';

const initialState = {
    isLoading: null,
    payload: [],
    totalPrice: 0,
    totalItem: 0,
    status: null
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
                payload: action.payload,
                isLoading: false,
                totalPrice: action.totalPrice,
                totalItem: action.totalItem,
            }
        case ADDCART_SUCCESS:
            //localStorage.setItem('cart', JSON.stringify(action.payload));
            return {
                ...state,
                payload: action.payload,
                totalPrice: action.totalPrice,
                totalItem: action.totalItem,
                isLoading: false,
                status: null,
            }
        case ADDCART_FAIL:
            return {
                ...state,
                payload: [],
                isLoading: false
            }
        case REMOVECART_SUCCESS:
            //localStorage.setItem('cart', JSON.stringify(action.payload));
            return {
                ...state,
                payload: action.payload,
                totalPrice: action.totalPrice,
                totalItem: action.totalItem,
                isLoading: false,
                status: null,
            }
        case QTYCONTROL_SUCCESS:
            return {
                ...state,
                payload: action.payload,
                totalPrice: action.totalPrice,
                totalItem: action.totalItem,
                isLoading: false,
                status: null,
            }
        case QTYCONTROL_FAIL:
            return {
                ...state,
                isLoading: false,
                status: action.status,
            }
        case CART_EMPTY:
            localStorage.removeItem('cart');
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}