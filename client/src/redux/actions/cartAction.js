import {
    // ADDCART_FAIL,
    // CART_LOADED,
    // CART_LOADING,
    ADDCART_SUCCESS,
    REMOVECART_SUCCESS
} from '../actions/types';

import { returnErr } from './errorAction';

export const addToCart = (product) => (dispatch, getState) => {
    // const existCart = getState().cart.payload;
    // const totalItem = getState().cart.totalItem;
    // const totalPrice = getState().cart.totalPrice;
    const { payload, totalItem, totalPrice } = getState().cart;
    const existCart = payload;
    const newCart = [...existCart];
    let quantity = 1;
    let newTotalItem = 0;
    let existed_item = newCart.find(item => item.productID === product.productID)
    if (existed_item) {
        existed_item.quantity += 1;
        let newTotalPrice = product.price + totalPrice;
        newTotalItem = totalItem + 1;
        dispatch({ type: ADDCART_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem });
    } else {
        let newTotalPrice = totalPrice + product.price;
        const newProduct = { productID: product.productID, name: product.name, quantity: quantity, price: product.price, image: product.images[0] }
        newCart.push(newProduct);
        newTotalItem = totalItem + 1;
        dispatch({ type: ADDCART_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem });
    }
}

export const removeFromCart = (product) => (dispatch, getState) => {
    const { payload, totalItem, totalPrice } = getState().cart;
    const newCart = [...payload];
    let existed_item = newCart.find(item => item.productID === product.productID)
    if (existed_item) {
        let newTotalPrice = totalPrice;
        let newTotalItem = totalItem;
        let index = newCart.indexOf(existed_item);
        newCart.splice(index, 1);
        newTotalPrice -= existed_item.quantity * product.price;
        newTotalItem -= existed_item.quantity;
        dispatch({ type: REMOVECART_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem })
    }
}

export const add = (productID) => (dispatch, getState) => {
    const { payload } = getState().cart;
    const existCart = payload;
    const existedItem = existCart.find(item => item.productID === productID);
    existedItem.quantity += 1;
    console.log(existedItem.quantity);
    dispatch({ type: ADDCART_SUCCESS, quantity: existedItem.quantity });
}

export const subtract = () => (dispatch, getState) => {
    const { payload } = getState().cart;
    const existCart = payload;
    console.log(existCart);
}
