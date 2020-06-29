import {
    // ADDCART_FAIL,
    // CART_LOADED,
    // CART_LOADING,
    ADDCART_SUCCESS,
    REMOVECART_SUCCESS,
    QTYCONTROL_SUCCESS,
    QTYCONTROL_FAIL
} from '../actions/types';
import { toast } from 'react-toastify';


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
        if (existed_item.quantity <= product.stock) {
            existed_item.quantity += 1;
            let newTotalPrice = product.price + totalPrice;
            newTotalItem = totalItem + 1;
            dispatch({ type: ADDCART_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem });
        } else dispatch({ type: QTYCONTROL_FAIL, status: "Troi oi" })
    } else {
        let newTotalPrice = totalPrice + product.price;
        const newProduct = { productID: product.productID, name: product.name, quantity: quantity, price: product.price, image: product.images[0], stock: product.stock }
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

export const quantityControl = (product, type) => (dispatch, getState) => {
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