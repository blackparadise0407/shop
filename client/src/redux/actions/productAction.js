import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    PRODUCTS_LOADING,
    PRODUCTS_FAIL,
    GET_SINGLE_PRODUCT,
    ADD_FAIL
} from './types';
import { storage } from '../../firebase';
import { tokenConfig } from './authAction';
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

export const getProductById = ({ productID }) => async dispatch => {
    dispatch({ type: PRODUCTS_LOADING })
    try {
        const res = await axios.get(`/api/products/${productID}`)
        dispatch({ type: GET_SINGLE_PRODUCT, payload: res.data.results })
    } catch (err) {
        dispatch(returnErr(err.response.data, err.response.status));
        dispatch({ type: PRODUCTS_FAIL });
    }
}

const handleFailSubmit = (name) => {
    var storageRef = storage.ref();
    storageRef.child('uploads/' + name).delete().then(() => console.log("Deleted")).catch(err => console.log(err))
}

export const addProduct = ({ name, category, stock, price, description, images }) => async (dispatch, getState) => {
    const body = JSON.stringify({ name, category, stock, price, description, images });
    const config = tokenConfig(getState);
    dispatch({ type: PRODUCTS_LOADING });
    try {
        const res = await axios.post('/api/products/', body, config);
        dispatch({ type: ADD_PRODUCT })
    } catch (err) {
        handleFailSubmit(name);
        dispatch(returnErr(err.response.data, err.response.status));
        dispatch({ type: ADD_FAIL });
    }
}