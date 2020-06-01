import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';
export const makeRequest = async ({
    method = "GET",
    url,
    params = null,
    data = null
}) => {
    try {
        const res = await axios({
            method,
            url,
            params,
            data
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}