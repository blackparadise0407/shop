import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    PRODUCTS_LOADING,
    PRODUCTS_FAIL,
    GET_SINGLE_PRODUCT,
    ADD_FAIL,
    UPDATE_SUCCESS,
    UPDATE_FAIL
} from './types';

//import { storage } from '../../firebase';
import { tokenConfig } from './authAction';
import { returnErr } from './errorAction'
import { toast } from 'react-toastify';
import axios from 'axios';
import productApi from '../../api/productApi';
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

export const getFilteredProducts = ({ filterBy = null, page = 1, limit = 6 }) => async dispatch => {
    dispatch({ type: PRODUCTS_LOADING });
    try {
        const params = {
            filterBy,
            page,
            limit
        }
        const resp = await productApi.getAll(params);
        dispatch({ type: GET_PRODUCTS, payload: resp })
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
//FIRE BASE
// const handleFailSubmit = (name) => {
//     var storageRef = storage.ref();
//     storageRef.child('uploads/' + name).delete().then(() => console.log("Deleted")).catch(err => console.log(err))
// }

// export const addProduct = ({ name, category, stock, price, description, images }) => async (dispatch, getState) => {
//     const body = JSON.stringify({ name, category, stock, price, description, images });
//     const config = tokenConfig(getState);
//     dispatch({ type: PRODUCTS_LOADING });
//     try {
//         const res = await axios.post('/api/products/', body, config);
//         dispatch({ type: ADD_PRODUCT, payload: res.data })
//     } catch (err) {
//         handleFailSubmit(name);
//         dispatch(returnErr(err.response.data, err.response.status));
//         dispatch({ type: ADD_FAIL });
//     }
// }

export const addProduct = ({ name, category, stock, price, description }) => async (dispatch, getState) => {
    const body = JSON.stringify({ name, category, stock, price, description });
    const config = tokenConfig(getState);
    dispatch({ type: PRODUCTS_LOADING });
    try {
        const res = await axios.post('/api/products/', body, config);
        dispatch({ type: ADD_PRODUCT, payload: res.data });
        toast.success(res.data.msg);
    } catch (err) {
        dispatch(returnErr(err.response.data, err.response.status));
        dispatch({ type: ADD_FAIL });
        toast.warn(err.response.data.msg);
    }
}

export const updateProduct = ({ name, stock, price, description, images }, productID) => async (dispatch, getState) => {
    const token = getState().auth.token || localStorage.getItem('token');
    const formData = new FormData();
    images.forEach(image => {
        formData.append('images', image);
    })
    formData.append('name', name);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('description', description);
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    if (token) {
        config.headers['auth-token'] = token;
    }

    dispatch({ type: PRODUCTS_LOADING });
    try {
        const res = await axios.post(`/api/products/${productID}/update`, formData, config);
        dispatch({ type: UPDATE_SUCCESS, payload: res.data.msg })
        toast.success(res.data.msg);
    } catch (err) {
        dispatch(returnErr(err.response.data, err.response.status));
        dispatch({ type: UPDATE_FAIL });
        toast.warn(err.response.data.msg);
    }
}