import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const UpComming = () => {

    const axiosPublic = useAxiosPublic();
    const { data: employees = [] } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const res = await axiosPublic.get('/employee')
            console.log(res?.data)
            return res.data
        }
    })

    return (
        <div className="mt-20">
            <h1 className="text-3xl text-left mt-10 font-semibold mb-8">Upcoming Event:</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-lg text-black">
                            <th>NO.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Date Of Birth</th>
                            <th>Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, idx) => <tr key={employee._id}>
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
                            <td>{employee.DOB}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UpComming;