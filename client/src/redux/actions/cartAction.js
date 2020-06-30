import _ from 'lodash';
import {
    // ADDCART_FAIL,
    // CART_LOADED,
    // CART_LOADING,
    ADDCART_SUCCESS,
    REMOVECART_SUCCESS,
    QTYCONTROL_SUCCESS,
    QTYCONTROL_FAIL,
    CART_LOADED,
    CART_EMPTY
} from '../actions/types';
import { toast } from 'react-toastify';
import { encrypt, decrypt } from '../../utils/cipher';

export const loadCart = () => (dispatch, getState) => {
    if (getState().cart.payload.length === 0) localStorage.removeItem('cart');
    const tempCart = localStorage.getItem('cart');
    if (tempCart) {
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
    } else return;
}

export const addToCart = product => (dispatch, getState) => {
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
        const { productID, name, price, images, stock } = product;
        const newProduct = { productID, name, quantity, price, image: images[0], stock }
        newCart.push(newProduct);
        newTotalItem = totalItem + 1;
        const encrypted = encrypt(JSON.stringify(newCart));
        localStorage.setItem('cart', encrypted);
        dispatch({ type: ADDCART_SUCCESS, payload: newCart, totalItem: newTotalItem, totalPrice: newTotalPrice })
    }
}


// export const addToCart = (product) => (dispatch, getState) => {
//     const { payload, totalItem, totalPrice } = getState().cart;
//     const existCart = payload;
//     const newCart = [...existCart];
//     let quantity = 1;
//     let newTotalItem = 0;
//     let existed_item = newCart.find(item => item.productID === product.productID)
//     if (existed_item) {
//         if (existed_item.quantity <= product.stock) {
//             existed_item.quantity += 1;
//             let newTotalPrice = product.price + totalPrice;
//             newTotalItem = totalItem + 1;
//             dispatch({ type: ADDCART_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem });
//             const encrypted = encrypt(JSON.stringify(newCart));
//             localStorage.setItem('cart', encrypted);
//         } else dispatch({ type: QTYCONTROL_FAIL, status: "Troi oi" })
//     } else {
//         let newTotalPrice = totalPrice + product.price;
//         const newProduct = { productID: product.productID, name: product.name, quantity: quantity, price: product.price, image: product.images[0], stock: product.stock }
//         newCart.push(newProduct);
//         newTotalItem = totalItem + 1;
//         dispatch({ type: ADDCART_SUCCESS, payload: newCart, totalPrice: newTotalPrice, totalItem: newTotalItem });
//         const encrypted = encrypt(JSON.stringify(newCart));
//         localStorage.setItem('cart', encrypted);
//     }
// }

export const removeFromCart = (product) => (dispatch, getState) => {
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
                    dispatch({ type: QTYCONTROL_FAIL, status: "Quantity must be greater than 0" });
                };
                break;
            default:
                break;
        }
    }
}