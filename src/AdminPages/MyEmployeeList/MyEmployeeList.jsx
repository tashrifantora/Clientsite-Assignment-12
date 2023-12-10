import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import useAuth from "../../Hooks/useAuth";


const MyEmployeeList = () => {
    const { loading } = useAuth()
    const axiosPublic = useAxiosPublic();

    const { data: selectedEmployee = [], refetch } = useQuery({
        queryKey: ['selectedEmployee'],
        queryFn: async () => {
            const res = await axiosPublic.get('/selected-employee')
            return res.data
        }
    })

    const handledeleteMember = (employee) => {
        Swal.fire({
            title: "Are you sure!!",
            text: `You want to remove ${employee?.name} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {

                // TODO: Have to chance it with [AxiousSecure]
                axiosPublic.delete(`/selected-employee/${employee._id}`)
                    .then(res => {
                        refetch()
                        if (res?.data?.deletedCount > 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Done',
                                text: `${employee?.name} Deleted successfully`,
                                footer: '<a href="">Thank you</a>'
                            });
                        }
                    })
            }
        });

    }

    if (loading) {
        <span className="loading loading-spinner loading-lg"></span>
    }
    return (
        <div>
            <h1>My Employee List: {selectedEmployee.length}</h1>

            <div className="overflow-x-auto p-5 bg-[#efecf3]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-black">
                            <th>No.</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedEmployee.map((employee, idx) => <tr key={employee._id}>
                                <td className="font-bold">{idx + 1}</td>
                                <td className="">
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
                                <th>
                                    <button
                                        onClick={() => handledeleteMember(employee)}
                                        className="btn btn-circle">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
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

export default MyEmployeeList;