import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaCheck } from "react-icons/fa6";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import useAuth from "../../Hooks/useAuth";

const AddEmployee = () => {
    const { loading } = useAuth()
    const axiosPublic = useAxiosPublic();

    const { refetch, data: employee = [] } = useQuery({
        queryKey: ['employee'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/employee`)
            return res.data;
        },
    })

    //  Add Member
    const handleAddMember = (member) => {
        console.log(member)
        const selected = {
            name: member.name,
            email: member.email,
            DOB: member.DOB,
            photo: member.photo
        }
        console.log(selected)
        //   TODO: AxiosSecure
        axiosPublic.post(`/selected-employee`, selected)
            .then(res => {
                console.log(res.data)
                if (res.data?.insertedId) {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        text: `${selected?.name} is add your team succesfull`,
                        footer: '<a href="">Thank you</a>'
                    });
                }
            })
    }

    if (loading) {
        <span className="loading loading-spinner loading-lg"></span>
    }
    return (
        <div>
            <div className="overflow-x-auto mx-12">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-black">
                            <th>No</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map((emp, idx) => <tr key={emp._id}>
                                <td className="font-bold">{idx + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squire rounded-lg w-20 h-20">
                                                <img src={emp.photo} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">{emp.name}</td>
                                <th>
                                    <button
                                        onClick={() => handleAddMember(emp)}
                                        className="btn btn-circle">
                                        <FaCheck></FaCheck>
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AddEmployee;