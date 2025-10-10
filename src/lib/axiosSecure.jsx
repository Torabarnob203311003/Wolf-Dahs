import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://2e7003067a82.ngrok-free.app/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 100000,
});

export default axiosSecure;