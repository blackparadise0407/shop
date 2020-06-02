import { GET_PRODUCTS, ADD_PRODUCT, PRODUCTS_LOADING } from '../actions/types';
const initialState = {
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_PRODUCTS:
            return {
                ...state,
                payload: action.payload,
                isLoading: false
            }
        // case ADD_PRODUCT:
        //     return {
        //         ...state
        //     }


        default:
            return state;
    }
}