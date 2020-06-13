import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    PRODUCTS_LOADING,
    PRODUCTS_FAIL
} from './types';
import { returnErr } from './errorAction'
import axios from 'axios';
export const getProducts = ({ page = 1, limit = 6 }) => async dispatch => {
    dispatch({ type: PRODUCTS_LOADING });
    try {
        const results = await axios.get("/api/products", {
            params: {
                page,
                limit
            }
        });
        dispatch({ type: GET_PRODUCTS, payload: results.data })
    } catch (err) {
        dispatch(returnErr(err.response.data, err.response.status));
        dispatch({ type: PRODUCTS_FAIL });
    }
}

//http://localhost:5000/api/products/search?filterBy=priceAsc&page=4&limit=2

export const getFilterProducts = ({ filterBy = null, page = 1, limit = 6 }) => async dispatch => {
    dispatch({ type: PRODUCTS_LOADING });
    try {
        const results = await axios.get("/api/products/search", {
            params: {
                filterBy,
                page,
                limit
            }
        });
        dispatch({ type: GET_PRODUCTS, payload: results.data })
    } catch (err) {
        dispatch(returnErr(err.response.data, err.response.status));
        dispatch({ type: PRODUCTS_FAIL });
    }
}