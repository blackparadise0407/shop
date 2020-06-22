import {
    ADDCART_FAIL,
    ADDCART_SUCCESS,
    CART_LOADED,
    CART_LOADING
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
        const newProduct = { productID: product.productID, name: product.name, quantity: quantity, image: product.images[0] }
        newCart.push(newProduct);
        newTotalItem = totalItem + 1;
        dispatch({ type: ADDCART_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem });
    }
}  