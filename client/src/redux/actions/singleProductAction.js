import axios from 'axios';
import {
    GET_SINGLE_PRODUCTS,
    SINGLE_PRODUCT_LOADING,
    SINGLE_PRODUCT_FAIL,
} from './types';
import { returnErr } from './errorAction';

//GET A PRODUCT 
export const loadProductById = ({ productID }) => async dispatch => {
    dispatch({ type: SINGLE_PRODUCT_LOADING })
    try {
        const res = await axios.get(`/api/products/${productID}`)
        dispatch({ type: GET_SINGLE_PRODUCTS, payload: res.data })
    } catch (err) {
        dispatch(returnErr(err.response.data, err.response.status));
        dispatch({ type: SINGLE_PRODUCT_FAIL })
    }
}