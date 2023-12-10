import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: isAdmin = [] } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/HR/make-admin/${user?.email}`)
            return res?.data?.admin;
        },
    })
    return [isAdmin, refetch]
};

export default useAdmin;