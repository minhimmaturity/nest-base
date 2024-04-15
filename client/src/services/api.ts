import axios from "axios";
import { LoginParams } from "../type";

const LOCALHOST = "http://localhost";
const PATH_PREFIX = `/api`;
export const API_URL = import.meta.env.DEV
  ? `${LOCALHOST}:${import.meta.env.VITE_PORT}${PATH_PREFIX}`
  : PATH_PREFIX;

export const API_URL_STATIC = import.meta.env.DEV
  ? `${LOCALHOST}:${import.meta.env.VITE_PORT}`
  : "";

const API = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true,
});

API.interceptors.request.use((config: any) => {
  config.headers.Authorization = localStorage.getItem("token");
  console.log("hjah");
  return config;
});

API.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    const status = error.response.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(error);
    } else if (status < 200 || status > 300) {
      throw new Error(error.message);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export const loginRequest = (params: LoginParams) => {
  return axios.post(`${API_URL}/auth/login`, params);
};

export default API;
