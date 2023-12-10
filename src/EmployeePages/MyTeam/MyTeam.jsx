import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLoaderData } from "react-router-dom";
import UpComming from "./UpComming";
import useAuth from "../../Hooks/useAuth";


const MyTeam = () => {
    const { loading } = useAuth()
    const admins = useLoaderData()
    const axiosPublic = useAxiosPublic();
    const { data: allEmployee = [] } = useQuery({
        queryKey: ['allEmployee'],
        queryFn: async () => {
            const res = await axiosPublic.get('/employee')
            return res.data
        }
    })

    if (loading) {
        <span className="loading loading-spinner loading-lg"></span>
    }


    return (
        <div>

            <h1 className="text-3xl text-left mt-10 font-semibold">Team Member List:</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-lg text-black">
                            <th>NO.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Member type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allEmployee.map((employee, idx) => <tr key={employee._id}>
                            <td className="font-bold">{idx + 1}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squire rounded-lg w-20 h-20">
                                            <img src={employee.photo} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="font-bold">
                                {employee.name}
                            </td>
                            <td>{
                                employee.role === "admin" ? "Admin" : "Employee"
                            }</td>
                        </tr>
                        )}
                        {/* Admin */}
                        {admins.map((admin, idx) => <tr key={admin._id}>
                            <td className="font-bold">{idx + 8}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squire rounded-lg w-20 h-20">
                                            <img src={admin.companyLogo} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="font-bold">
                                {admin.name}
                            </td>
                            <td>{
                                admin.role === "admin" ? "Admin" : "Employee"
                            }</td>
                        </tr>
                        )}

                    </tbody>
                </table>
            </div>

            <UpComming></UpComming>
        </div>
    );
};

export default MyTeam;