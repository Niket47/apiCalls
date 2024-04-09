import axios from 'axios';
import { BASE_URL } from './endpoints';
import { getData } from './globalFunctions';


// const makeApiCall = async (method, endpoint, data, headers = {}) => {
//   const apiUrl = BASE_URL + endpoint;
//   console.log(headers, "-------------headers-----",)
//   console.log(method, "-----------------method")
//   console.log(apiUrl, "------------------apiUrl")
//   console.log(data, "------------------------------makeApiCall-data")
//   try {
//     const key = 'token';
//     const token = await getData(key);
//     console.log(token, "token--------------------------------")
//     const response = await axios({
//       method: method,
//       url: apiUrl,
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         ...headers,
//       },
//       data: data,
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error.response, "------makeApiCall")
//     return error;
//   }
// };


// const makeFormDataCall = async (method, endpoint, data, headers = {}) => {
//   const apiUrl = BASE_URL + endpoint;
//   console.log(headers, "-------------headers-----",)
//   console.log(method, "-----------------method")
//   console.log(apiUrl, "------------------apiUrl")
//   console.log(data, "------------------------------makeFormDataCall-data")
//   try {
//     const key = 'token';
//     const token = await getData(key);
//     console.log(token, "token--------------------------------")
//     const response = await axios({
//       method: method,
//       url: apiUrl,
//       data: data,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Accept': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'POST',
//         'Access-Control-Allow-Headers': 'content-type, authorization',
//         'Access-Control-Allow-Credentials': 'true',
//         ...headers,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error.response, "------makeFormDataCall")
//     return error;
//   }
// };

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
    // return error;
    return error.response.data;
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
  return makeFormDataCall('post', '/api/auth/signup', data);
};


export const finalStepPost = async (formData) => {
  console.log(formData, "formData----------------")
  return makeApiCall('post', '/api/auth/signup', formData, true, {});
};


