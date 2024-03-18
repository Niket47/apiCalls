import axios from 'axios';
import { BASE_URL } from './endpoints';
import { getData } from './globalFunctions';

// const makeApiCall = async (method, endpoint, data, headers = {}) => {
//     const apiUrl = BASE_URL + endpoint;
//     try {
//         const key = 'token';
//         const token = await getData(key);
//         console.log(token, "token--------------------------------")
//         const response = await axios({
//             method: method,
//             url: apiUrl,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//                 ...headers,
//             },
//             data: data,
//         });
//         return response.data;
//     } catch (error) {
//         console.log(error.response, "------makeApiCall")
//         return error;
//     }
// };

// const makeFormDataCall = async (method, endpoint, data, headers = {}) => {
//     const apiUrl = BASE_URL + endpoint;
//     try {
//         const key = 'token';
//         const token = await getData(key);
//         console.log(token, "token--------------------------------")
//         const response = await axios({
//             method: method,
//             url: apiUrl,
//             data: data,
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'POST',
//                 'Access-Control-Allow-Headers': 'content-type, authorization',
//                 'Access-Control-Allow-Credentials': 'true',
//                 ...headers,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.log(error.response, "------makeFormDataCall")
//         return error;
//     }
// };



// export const login = async credentials => {
//     return makeApiCall('post', '/api/auth/sendOtp', { mobileNumber: credentials });
// };

// export const verifyOtp = async data => {
//     return makeApiCall('post', '/api/auth/verifyOtp', data);
// };

// export const getLoginUserData = async (data) => {
//     console.log(data, "formData----------------")
//     return makeFormDataCall('post', '/api/auth/signup', data,);
// };

// export const signUp = async (credentials) => {
//     return makeApiCall('post', '/api/auth/user/signup', credentials);
// };

// export const CreateStore = async (credentials) => {
//     return makeApiCall('post', '/super/admin/emailVerifySend', credentials);
// };

// export const ChangePasswordCall = async (credentials) => {
//     return makeApiCall('post', '/admin/user/forgot-password/', credentials);
// };

// export const getProducts = async () => {
//     return makeApiCall('get', "/products");
// };

// export const getAllProducts = async (queryParam) => {
//     return makeApiCall('get', `/admin/analytics?${queryParam}`);
// };

// export const getMonthly = async (queryParam) => {
//     return makeApiCall('get', `/admin/analytics?${queryParam}`);
// };

// export const getUser = async () => {
//     return makeApiCall('get', "/admin/client/getClient");
// };

// export const deleteProduct = async (productId) => {
//     return makeApiCall('delete', `/usersData/${productId}`);
// };

// export const updateProduct = async (productId, updatedData) => {
//     return makeApiCall('put', `/products/${productId}`, updatedData);
// };

// export const patchProduct = async (productId, patchedData) => {
//     return makeApiCall('patch', `/products/${productId}`, patchedData);
// };



const BASE_URL = "https://api.escuelajs.co"


const prepareHeader = (isFormData = false, accessToken, customHeaders = {}) => {
    const requestHeader = {
        headers: {
            Accept: 'application/json',
            Authorization: accessToken,
            ...customHeaders
        }
    };
    if (isFormData) {
        requestHeader.headers['Content-Type'] = 'multipart/form-data'
    } else {
        requestHeader.headers['Content-Type'] = 'application/json'
    }
    return requestHeader
}

const makeApiCall = async (method, endpoint, data, isFormData = false, customHeaders = {}) => {
    const apiUrl = BASE_URL + endpoint;
    try {
        const key = 'token';
        const token = await getData(key);
        const headers = prepareHeader(isFormData, `Bearer ${token}`, customHeaders);

        const response = await axios({
            method: method,
            url: apiUrl,
            headers: headers.headers,
            data: data,
        });
        return response.data;
    } catch (error) {
        console.log(error.response, "------makeApiCall")
        return error;
    }
};



export const loginCall = async (credentials) => {
    console.log("CRED::::::::", credentials)
    const data = makeApiCall('post', "/api/v1/auth/login", credentials);
    console.log("data", data)
    return data
};

// Example of making a request with JSON data
// const jsonRequestExample = async () => {
//     const credentials = {
//         username: 'your_username',
//         password: 'your_password'
//     };
//     const data = await makeApiCall('post', "/admin/user/login", credentials);
//     return data
// };

// const formDataRequestExample = async () => {
//     const formData = new FormData();
//     formData.append('username', 'your_username');
//     formData.append('password', 'your_password');
//     const data = await makeApiCall('post', "/admin/user/login", formData, true);
//     return data
// };

const formdata = async (formData) => {
    const data = await makeApiCall('post', "/admin/user/login", formData, true);
    return data
}

const deleteRequestExample = async () => {
    const data = await makeApiCall('delete', "/your/api/endpoint");
    return data
};

const getRequestExample = async () => {
    const data = await makeApiCall('get', "/your/api/endpoint");
    return data
};

const postRequestExample = async () => {
    const postData = {
        key1: 'value1',
        key2: 'value2'
    };
    const data = await makeApiCall('post', "/your/api/endpoint", postData);
    return data
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

