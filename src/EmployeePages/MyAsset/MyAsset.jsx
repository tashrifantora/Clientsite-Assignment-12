import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { BsPrinter } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";


const MyAsset = () => {
    const { loading } = useAuth()

    const axiosPublic = useAxiosPublic();

    const { data: assetReq = [] } = useQuery({
        queryKey: ['assetReq'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-req')
            // console.log(res.data)
            return res.data
        }
    })

    if (loading) {
        <span className="loading loading-spinner loading-lg"></span>
    }

    return (
        <div>
            {/* Search & Find */}
            <div className="flex justify-between items-center my-10">
                <input type="text" placeholder="Search here" className="input input-bordered w-full max-w-xs" />

                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Find here</option>
                    <option value={'returnable'}>Returnable</option>
                    <option value={'non-returnable'}>Non returnAble</option>
                </select>
            </div>


            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-lg text-black">
                                <th>NO.</th>
                                <th>Asset Image</th>
                                <th>Asset Name</th>
                                <th>Asset Type</th>
                                <th>Request Date</th>
                                <th>Approved Date</th>
                                <th>Request Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assetReq.map((req, idx) => <tr key={req._id}>
                                <td className="font-bold">{idx + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squire rounded-lg w-20 h-20">
                                                <img src={req?.reqAssetImg} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">
                                    {req?.reqAssetName}
                                </td>
                                <td>{req?.reqAssetType}</td>
                                <td>{req?.reqAssetDate}</td>
                                <td>{req?.currentDate}</td>
                                <td>{req?.reqAssetStatus}</td>
                                <th>

                                    {req?.reqAssetStatus === 'pending' ? <button className="btn btn-circle">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button> : <button className="btn btn-circle">
                                        <BsPrinter className="text-2xl"></BsPrinter>
                                    </button>}
                                </th>

                            </tr>)}

                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyAsset;