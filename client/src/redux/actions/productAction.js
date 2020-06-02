import { GET_PRODUCTS, ADD_PRODUCT, PRODUCTS_LOADING } from './types';
import { makeRequest } from '../../utils/api';
export const getProducts = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCTS_LOADING });
    try {
        const result = await makeRequest({
            method: "GET",
            url: "/api/products",
        })
        dispatch({ type: GET_PRODUCTS, payload: result })
    } catch (error) {
        console.log(error);
    }
}