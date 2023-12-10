import axios from "axios";

const axiousPublic = axios.create({
    baseURL: 'https://asset-catalyst-server.vercel.app'

})
const useAxiosPublic = () => {
    return axiousPublic;
};

export default useAxiosPublic;