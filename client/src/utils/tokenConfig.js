const tokenConfig = getState => {
    const token = getState().auth.token || localStorage.getItem('token');
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    if (token) {
        config.headers['auth-token'] = token;
    }
    return config;
}

export default tokenConfig;