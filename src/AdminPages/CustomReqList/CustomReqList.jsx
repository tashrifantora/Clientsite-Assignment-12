import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaCheck } from "react-icons/fa";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import useAuth from "../../Hooks/useAuth";

const CustomReqList = () => {
    const { loading } = useAuth
    const axiosPublic = useAxiosPublic()

    const { data: customReqList = [], refetch } = useQuery({
        queryKey: ['customReqList'],
        queryFn: async () => {
            const res = await axiosPublic.get('/custom-req')
            console.log(res.data)
            return res.data
        }
    })

    // Reject
    const handleReject = (reject) => {
        Swal.fire({
            title: "Are you sure!!",
            text: `You want to reject ${reject?.name} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {

                // TODO: Have to chance it with [AxiousSecure]
                axiosPublic.delete(`/custom-req/${reject._id}`)
                    .then(res => {
                        refetch()
                        if (res?.data?.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                icon: 'success',
                                title: 'Done',
                                text: `${reject?.name} reject successfully`,
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
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-black">
                            <th>No.</th>
                            <th>Asset Image</th>
                            <th>Name</th>
                            <th>Asset Type</th>
                            <th>Price</th>
                            <th>Why Needed</th>
                            <th>Aditional note</th>
                            <th>Approvrd</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customReqList.map((reqList, idx) =>
                            <tr className="bg-[#e8e8f1]" key={reqList._id}>
                                <td className="font-bold">{idx + 1}</td>
                                <td className="">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squire rounded-lg w-20 h-20">
                                                <img src={reqList?.assetImg} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">
                                    {reqList?.name}
                                </td>
                                <td>{reqList?.assetType}</td>
                                <td>{reqList?.price || "No price Added"}</td>
                                <td>{reqList?.whyNeed}</td>
                                <td>{reqList?.aditional}</td>
                                <th>
                                    <button
                                        className="btn btn-circle">
                                        <FaCheck></FaCheck>
                                    </button>
                                </th>
                                <th>
                                    <button
                                        onClick={() => handleReject(reqList)}
                                        className="btn btn-circle">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </th>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomReqList;