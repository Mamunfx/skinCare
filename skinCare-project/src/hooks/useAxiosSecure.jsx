import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://a11-server-tau.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {

    return axiosInstance;
};

export default useAxiosSecure;