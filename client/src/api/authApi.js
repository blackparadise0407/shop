import axiosClient from './axiosClient';

const authApi = {
    get: () => {
        const url = '/users';
        return axiosClient.get(url);
    },
    postLogin: (data) => {
        const url = '/users/login';
        return axiosClient.post(url, data);
    }
}

export default authApi;
