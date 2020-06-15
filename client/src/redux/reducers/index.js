import { combineReducers } from 'redux';
import productReducer from './productReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    products: productReducer,
    auth: authReducer,
    error: errorReducer
})