import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const usePackage = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, data: hr = [] } = useQuery({
        queryKey: ['hr'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/HR`)
            return res.data;
        },
    })
    return [hr, refetch]
};

export default usePackage;