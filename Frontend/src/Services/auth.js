import API from './api';


export const register = (data) => API.post('/register', data);

export const login = async (data) => {
    await API.get('/sanctum/csrf-cookie');
    return API.post('/login', data);
};

export const logout = () => API.post('/logout');

export const me = () => API.get('/me');

