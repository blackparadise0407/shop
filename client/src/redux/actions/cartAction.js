import _ from 'lodash';
import axios from 'axios';
import {
    // ADDCART_FAIL,
    // CART_LOADED,
    CART_LOADING,
    ADDCART_SUCCESS,
    REMOVECART_SUCCESS,
    QTYCONTROL_SUCCESS,
    QTYCONTROL_FAIL,
    CART_LOADED,
    CART_EMPTY,
    ADDCART_AUTH_SUCCESS
} from '../actions/types';
import { toast } from 'react-toastify';
import { encrypt, decrypt } from '../../utils/cipher';
import { tokenConfig } from './authAction';
import { returnErr } from './errorAction';

export const loadCart = () => dispatch => {
    dispatch({ type: CART_LOADING });
    const tempCart = localStorage.getItem('cart');
    if (tempCart) {
        let jsonFormattedCart = JSON.parse(decrypt(localStorage.getItem('cart')));
        if (jsonFormattedCart.length === 0) {
            localStorage.removeItem('cart');
            dispatch({ type: CART_EMPTY })
        } else {
            const cart = localStorage.getItem('cart');
            let decipher = decrypt(cart);
            let newTotalItem = 0;
            let newTotalPrice = 0;
            const jsonCart = JSON.parse(decipher);
            _.map(jsonCart, (item) => {
                newTotalItem += item.quantity;
                newTotalPrice += item.quantity * item.price;
            })
            dispatch({ type: CART_LOADED, payload: jsonCart, totalItem: newTotalItem, totalPrice: newTotalPrice });
        }
    } else dispatch({ type: CART_EMPTY });
}

export const loadAuthCart = () => async (dispatch, getState) => {
    dispatch({ type: CART_LOADING });
    let isAuth = getState().auth.isAuthenticated;
    const config = tokenConfig(getState);
    let newTotalItem = 0;
    let newTotalPrice = 0;
    try {
        const resp = await axios.get('/api/users/cart', config);
        const cart = resp.data.user.cart;
        _.map(cart, item => {
            newTotalItem += item.quantity;
            newTotalPrice += item.quantity * item.product.price;
        })
        dispatch({ type: CART_LOADED, payload: cart, totalItem: newTotalItem, totalPrice: newTotalPrice });
    } catch (err) {
        dispatch(returnErr(err.response.data, err.response.status))
    }
    if (!isAuth) dispatch({ type: CART_EMPTY })

}

export const addAuthCart = (product) => async (dispatch, getState) => {
    dispatch({ type: CART_LOADING });
    const config = tokenConfig(getState);
    const body = JSON.stringify({ productID: product.productID })
    let newTotalPrice = 0;
    let newTotalItem = 0;
    try {
        await axios.post("/api/users/cart", body, config);
        const resp = await axios.get('/api/users/cart', config);
        const cart = resp.data.user.cart;
        _.map(cart, item => {
            newTotalItem += item.quantity;
            let price = item.product.price * item.quantity;
            newTotalPrice += price;
        })
        dispatch({ type: ADDCART_AUTH_SUCCESS, payload: cart, totalItem: newTotalItem, totalPrice: newTotalPrice, status: resp.data.msg })
    } catch (err) {
        dispatch(returnErr(err.response.data, err.response.status))
    }
}



export const addToCart = product => (dispatch, getState) => {
    dispatch({ type: CART_LOADING });
    const { payload, totalItem, totalPrice } = getState().cart;
    const temp = payload;
    const newCart = [...temp];
    let quantity = 1;
    let newTotalItem = 0;
    let existed_item = _.find(newCart, (item) => {
        return item.productID === product.productID;
    })
    if (existed_item) {
        if (existed_item.quantity <= product.stock) {
            existed_item.quantity += 1;
            let newTotalPrice = product.price + totalPrice;
            newTotalItem = totalItem + 1;
            const encrypted = encrypt(JSON.stringify(newCart));
            localStorage.setItem('cart', encrypted);
            dispatch({ type: ADDCART_SUCCESS, payload: newCart, totalItem: newTotalItem, totalPrice: newTotalPrice })
        } dispatch({ type: QTYCONTROL_FAIL, status: "Troi oi" })
    } else {
        let newTotalPrice = totalPrice + product.price;
        const { productID, name, price, images, stock, _id } = product;
        const newProduct = { _id, productID, name, quantity, price, image: images[0], stock }
        newCart.push(newProduct);
        newTotalItem = totalItem + 1;
        const encrypted = encrypt(JSON.stringify(newCart));
        localStorage.setItem('cart', encrypted);
        dispatch({ type: ADDCART_SUCCESS, payload: newCart, totalItem: newTotalItem, totalPrice: newTotalPrice })
    }
}

export const removeFromCart = (product) => (dispatch, getState) => {
    dispatch({ type: CART_LOADING });
    const { payload, totalItem, totalPrice } = getState().cart;
    const newCart = [...payload];
    let existed_item = newCart.find(item => item.productID === product.productID)
    if (newCart.length === 0) dispatch({ type: CART_EMPTY });
    if (existed_item) {
        let newTotalPrice = totalPrice;
        let newTotalItem = totalItem;
        let index = _.indexOf(newCart, existed_item);
        newCart.splice(index, 1);
        newTotalPrice -= existed_item.quantity * product.price;
        newTotalItem -= existed_item.quantity;
        const encrypted = encrypt(JSON.stringify(newCart));
        localStorage.setItem('cart', encrypted);
        dispatch({ type: REMOVECART_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem })
    } else console.log("What a go");
}

export const removeAuthCart = (product) => async (dispatch, getState) => {
    dispatch({ type: CART_LOADING });
    const config = tokenConfig(getState);
    try {
        await axios.delete(`/api/users/cart/${product.product.productID}`, config);
        const { payload, totalItem, totalPrice } = getState().cart;
        const newCart = [...payload];
        let existed_item = _.find(newCart, item => (
            item.product.productID === product.product.productID
        ))
        if (existed_item) {
            let newTotalPrice = totalPrice;
            let newTotalItem = totalItem;
            let index = _.indexOf(newCart, existed_item);
            newCart.splice(index, 1);
            newTotalPrice -= existed_item.quantity * product.product.price;
            newTotalItem -= existed_item.quantity;
            dispatch({ type: REMOVECART_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem })
        }
    } catch (e) {
        console.log(e);
    }
}

export const quantityControl = (product, type) => (dispatch, getState) => {
    dispatch({ type: CART_LOADING });
    const { payload, totalPrice, totalItem } = getState().cart;
    const newCart = [...payload];
    let existedItem = newCart.find(item => item.productID === product.productID);
    if (existedItem) {
        let newTotalPrice = totalPrice;
        let newTotalItem = totalItem;
        switch (type) {
            case "inc":
                if (existedItem.quantity < product.stock) {
                    existedItem.quantity += 1;
                    newTotalPrice = totalPrice + product.price;
                    newTotalItem = totalItem + 1;
                    const encrypted = encrypt(JSON.stringify(newCart));
                    localStorage.setItem('cart', encrypted);
                    dispatch({ type: QTYCONTROL_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem });
                } else {
                    toast.warn("Quantity exceeds product stock :( Sorry");
                    dispatch({ type: QTYCONTROL_FAIL, status: "Quantity exceeds product stock :( Sorry" })
                }
                break;
            case "dec":
                if (existedItem.quantity > 0) {
                    existedItem.quantity -= 1;
                    newTotalPrice = totalPrice - product.price;
                    newTotalItem = totalItem - 1;
                    const encrypted = encrypt(JSON.stringify(newCart));
                    localStorage.setItem('cart', encrypted);
                    dispatch({ type: QTYCONTROL_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem });
                } else {
                    toast.warn("Quantity must be greater than 0");
                    removeFromCart(product);
                    dispatch({ type: QTYCONTROL_FAIL, status: "Quantity must be greater than 0" });
                };
                break;
            default:
                break;
        }
    }
}

export const quantityControlAuth = (product, type) => async (dispatch, getState) => {
    dispatch({ type: CART_LOADING });
    const { payload, totalPrice, totalItem } = getState().cart;
    const newCart = [...payload];
    const existed_item = _.find(newCart, item => (
        item.product.productID === product.product.productID
    ))
    if (existed_item) {
        let newTotalPrice = totalPrice;
        let newTotalItem = totalItem;
        switch (type) {
            case "inc":
                if (existed_item.quantity < product.product.stock) {
                    existed_item.quantity += 1;
                    newTotalPrice = totalPrice + product.product.price;
                    newTotalItem = totalItem + 1;
                    dispatch({ type: QTYCONTROL_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem });
                } else {
                    toast.warn("Quantity exceeds product stock :( Sorry");
                    dispatch({ type: QTYCONTROL_FAIL, status: "Quantity exceeds product stock :( Sorry" })
                }
                break;
            case "dec":
                if (existed_item.quantity > 0) {
                    existed_item.quantity -= 1;
                    newTotalPrice = totalPrice - product.product.price;
                    newTotalItem = totalItem - 1;
                    dispatch({ type: QTYCONTROL_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem });
                } else {
                    toast.warn("Quantity must be greater than 0");
                    dispatch({ type: QTYCONTROL_FAIL, status: "Quantity must be greater than 0" });
                };
                break;
            default:
                break;
        }
    }
}   