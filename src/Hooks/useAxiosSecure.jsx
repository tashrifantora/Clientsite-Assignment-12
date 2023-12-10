import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiousSecure = axios.create({
    baseURL: 'https://asset-catalyst-server.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useAuth()
    axiousSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log("interceptor", token)
        config.headers.authorization = `Bearar ${token}`

        return config;
    }, function (error) {
        return Promise.reject(error)
    })



    // Intercepts 401 and 403 status
    axiousSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status
        // console.log('status error in interceptor', status)

        // For 401 and 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    })


    return axiousSecure;
};

export default useAxiosSecure;