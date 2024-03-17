import axios from 'axios';
import { BASE_URL } from './endpoints';
import { getData } from './globalFunctions';

const makeApiCall = async (method, endpoint, data, headers = {}) => {
    const apiUrl = BASE_URL + endpoint;
    try {
        const key = 'token';
        const token = await getData(key);
        console.log(token, "token--------------------------------")
        const response = await axios({
            method: method,
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...headers,
            },
            data: data,
        });
        return response.data;
    } catch (error) {
        console.log(error.response, "------makeApiCall")
        return error;
    }
};

const makeFormDataCall = async (method, endpoint, data, headers = {}) => {
    const apiUrl = BASE_URL + endpoint;
    try {
        const key = 'token';
        const token = await getData(key);
        console.log(token, "token--------------------------------")
        const response = await axios({
            method: method,
            url: apiUrl,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'content-type, authorization',
                'Access-Control-Allow-Credentials': 'true',
                ...headers,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.response, "------makeFormDataCall")
        return error;
    }
};



export const login = async credentials => {
    return makeApiCall('post', '/api/auth/sendOtp', { mobileNumber: credentials });
};

export const verifyOtp = async data => {
    return makeApiCall('post', '/api/auth/verifyOtp', data);
};

export const getLoginUserData = async (data) => {
    console.log(data, "formData----------------")
    return makeFormDataCall('post', '/api/auth/signup', data,);
};

export const signUp = async (credentials) => {
    return makeApiCall('post', '/api/auth/user/signup', credentials);
};

export const CreateStore = async (credentials) => {
    return makeApiCall('post', '/super/admin/emailVerifySend', credentials);
};

export const ChangePasswordCall = async (credentials) => {
    return makeApiCall('post', '/admin/user/forgot-password/', credentials);
};

export const getProducts = async () => {
    return makeApiCall('get', "/products");
};

export const getAllProducts = async (queryParam) => {
    return makeApiCall('get', `/admin/analytics?${queryParam}`);
};

export const getMonthly = async (queryParam) => {
    return makeApiCall('get', `/admin/analytics?${queryParam}`);
};

export const getUser = async () => {
    return makeApiCall('get', "/admin/client/getClient");
};

export const deleteProduct = async (productId) => {
    return makeApiCall('delete', `/usersData/${productId}`);
};

export const updateProduct = async (productId, updatedData) => {
    return makeApiCall('put', `/products/${productId}`, updatedData);
};

export const patchProduct = async (productId, patchedData) => {
    return makeApiCall('patch', `/products/${productId}`, patchedData);
};
