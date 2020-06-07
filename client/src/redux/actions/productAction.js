import { GET_PRODUCTS, ADD_PRODUCT, PRODUCTS_LOADING, PRODUCTS_FAIL } from './types';
import { returnErr } from './errorAction'
import axios from 'axios';
export const getProducts = (page, limit) => async dispatch => {
    dispatch({ type: PRODUCTS_LOADING });
    try {
        const result = await axios.get("/api/products", {
            params: {
                page: page,
                limit: limit
            }
        });
        dispatch({ type: GET_PRODUCTS, payload: result.data })
    } catch (err) {
        dispatch(returnErr(err.response.data, err.response.status));
        dispatch({ type: PRODUCTS_FAIL });
    }
}