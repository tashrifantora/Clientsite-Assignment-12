import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const EmployeeHome = () => {
    const { loading } = useAuth()
    const axiosPublic = useAxiosPublic()

    if (loading) {
        <span className="loading loading-spinner loading-lg"></span>
    }

    const { data: customReq = [] } = useQuery({
        queryKey: ['customReq'],
        queryFn: async () => {
            const res = await axiosPublic.get('/custom-req')
            // console.log(res.data)
            return res.data
        }
    })
    return (
        <div>
            <h1 className='text-2xl text-left font-semibold my-8'>This is employee Home: </h1>

            {/* My Custom Requests Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4">

            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-black text-lg">
                            <th>No</th>
                            <th>Asset Name</th>
                            <th>Asset Image</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customReq.map((req, idx) => <tr key={req._id}>                    <th>{idx + 1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squire rounded-lg w-20 h-20">
                                            <img src={req.assetImg} />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="font-semibold">{req.name}</td>
                            <td>{req.assetType}</td>                    <td>{req.status}</td>                    <td>                        <button onClick={() => document.getElementById(req._id).showModal()} className="btn bg-[#44426E] text-white">Details</button>                        <div>                            <dialog id={req._id} className="modal modal-bottom sm:modal-middle ">                                <div className="modal-box w-11/12 max-w-5xl">                                    <div className="card-compact ">                                        <figure><img className="w-1/2 rounded-lg ml-3" src={req.assetImg} alt="Asset img" /></figure>                                        <div className="card-body">               <div className="flex items-center justify-between gap-5">
                                <h2 className="card-title">{req.name}</h2>
                                <p>({req.date})</p>
                            </div>                                 <p><span className="font-bold">Price:</span> ${req.assetPrice}</p>
                                <p><span className="font-bold">Type:</span> {req.assetType}</p>
                                <p><span className="font-bold">Why Needed: </span>{req.whyNeed}</p>
                                <p><span className="font-bold">Aditional:</span> {req.aditional}</p>
                                <p className="text-red-500"># {req.status}</p>
                            </div>
                            </div>
                                <div className="modal-action flex justify-between">
                                    <form method="dialog">
                                        <button className="btn bg-[#44426E] text-white">Close</button>
                                    </form>
                                    <form method="dialog">
                                        <Link to={`/employee/update-req/${req._id}`}>
                                            <button className="btn bg-[#44426E] text-white">Update</button>
                                        </Link>
                                    </form>
                                </div>
                            </div>
                            </dialog>
                            </div>
                            </td>
                        </tr>
                        )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default EmployeeHome;

