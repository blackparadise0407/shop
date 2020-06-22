import { combineReducers } from 'redux';
import productReducer from './productReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import cartReducer from './cartReducer';

export default combineReducers({
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    error: errorReducer,
})