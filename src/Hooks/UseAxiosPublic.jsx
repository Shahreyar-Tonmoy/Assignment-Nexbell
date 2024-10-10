import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://dummyjson.com'
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;