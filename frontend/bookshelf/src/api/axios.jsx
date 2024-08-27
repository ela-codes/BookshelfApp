import axios from 'axios';
const BASE_URL ="xxxxx";

export default axios.create({
    baseURL:BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL:BASE_URL,
    headers:{'Content-type':'application/json'},
    withCredentials:true
});