import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLoaderData } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import moment from "moment";
import useAuth from "../../Hooks/useAuth";
// import RequestAsset from "./RequestAsset";


const AllRequest = () => {
    const { loading } = useAuth()
    const assetReq = useLoaderData([])
    const currentDate = moment().format('MMMM Do YYYY')

    // TODO: AxiousSecure
    const axiosPublic = useAxiosPublic();
    const { data: customReq = [], refetch } = useQuery({
        queryKey: ['customReq'],
        queryFn: async () => {
            const res = await axiosPublic.get('/custom-req')
            console.log(res?.data)
            return res.data
        }
    })


    // Custome Request Reject
    const handleReqReject = (assetReqRej) => {
        const rejectInfo = {
            reqAssetName: assetReqRej.assetName,
            reqAssetImg: assetReqRej.assetImg,
            reqAssetType: assetReqRej.assetType,
            reqAssetDate: assetReqRej.timeDate,
            currentDate: currentDate,
            reqAssetStatus: "pending",
        }
        axiosPublic.post(`/all-req`, rejectInfo)
            .then(res => {
                console.log(res.data)
                if (res.data?.insertedId) {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        text: `${rejectInfo?.reqAssetName} reject  succesfully`,
                        footer: '<a href="">Thank you</a>'
                    });
                }
            })

    }

    // Custom Request approve
    const handleCustomReqApp = (appCustomReq) => {
        const approbalInfo = {
            reqAssetName: appCustomReq.assetName,
            reqAssetImg: appCustomReq.assetImg,
            reqAssetType: appCustomReq.assetType,
            reqAssetDate: appCustomReq.timeDate,
            currentDate: currentDate,
            reqAssetStatus: "approved"
        }
        axiosPublic.post(`/all-req`, approbalInfo)
        refetch()
            .then(res => {
                console.log(res.data)
                if (res?.data?.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        text: `${appCustomReq?.assetName} approved  succesfully`,
                        footer: '<a href="">Thank you</a>'
                    });
                }
            })
    }


    // Custome Request Reject
    /* const handleAssetReqReject = (rejAssetReq) => {
        console.log(rejAssetReq)
        const rejectInfo = {
            reqAssetName: rejAssetReq.name,
            reqAssetType: rejAssetReq.assetType,
            reqAssetDate: rejAssetReq.date,
            currentDate: currentDate,
            reqAssetStatus: "reject",
        }
        // console.log(rejectInfo)
        axiosPublic.post(`/all-req`, rejectInfo)
            .then(res => {
                console.log(res.data)
                if (res.data?.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        text: `${rejectInfo?.reqAssetName} reject  succesfully`,
                        footer: '<a href="">Thank you</a>'
                    });
                }
            })

    }
 */

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

            <h1 className="text-4xl font-semibold text-left my-5">Custom Request:</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="Text-lg text-black">
                            <th>No.</th>
                            <th>Asset Image</th>
                            <th>Asset Name</th>
                            <th>Asset Type</th>
                            <th>Requester Email</th>
                            <th>Requester name</th>
                            <th>Date</th>
                            <th>Aditional note</th>
                            <th>Status</th>
                            <th>Reject</th>
                            <th>Approve</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customReq.map((req, idx) => <tr key={req._id}>
                            <td className="font-bold">{idx + 1}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squire rounded-lg w-20 h-20">
                                            <img src={req?.assetImg} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="font-bold">
                                {req?.name || "none"}
                            </td>
                            <td>{req?.assetType}</td>
                            <td>{req?.requesterName || "none"}</td>
                            <td>{req?.requesterEmail}</td>
                            <td>{req?.date}</td>
                            <td className="break-words">{req?.aditional}</td>
                            <td>{req?.status}</td>

                            <td>
                                <button
                                    className="btn btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </td>
                            <th>
                                <button
                                    className="btn btn-circle">
                                    <FaCheck></FaCheck>
                                </button>
                            </th>
                        </tr>)}

                        {
                            assetReq.map((reqAsset, idx) => <tr key={reqAsset._id}>
                                <td className="font-bold">{idx + 3}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squire rounded-lg w-20 h-20">
                                                <img src={reqAsset?.assetImg} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">
                                    {reqAsset?.assetName}
                                </td>
                                <td>{reqAsset?.assetType}</td>
                                <td>{reqAsset?.requesterEmail}</td>
                                <td>{reqAsset?.requestername}</td>
                                <td>{reqAsset?.timeDate}</td>
                                <td>{reqAsset?.availability}</td>
                                <td>{reqAsset?.status}</td>
                                <th>
                                    <button
                                        onClick={() => handleReqReject(reqAsset)}
                                        className="btn btn-circle">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </th>
                                <th>
                                    <button
                                        onClick={() => handleCustomReqApp(reqAsset)}
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

export default AllRequest;