import axiosClient from './axiosClient';

const productApi = {
    getAll: (params) => {
        const url = '/products/search';
        return axiosClient.get(url, { params });
    },

    get: (productID) => {
        const url = `/products/${productID}`;
        return axiosClient.get(url)
    }
}

export default productApi;