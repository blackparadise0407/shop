import axios from 'axios';
import queryString from 'query-string';
import history from '../utils/history';

const axiosClient = axios.create({
    //baseURL: process.env.REACT_APP_API_URL,
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    if (error.response.status === 401) {
        history.push('/login');
    }
    console.log(error);
    throw error;
});

export default axiosClient;