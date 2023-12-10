import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const AssetRequest = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useAuth();
    const requesterEmail = user?.email;
    const requestername = user?.displayName;
    const status = "painding"

    const { data: assets = [], refetch } = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/assets')
            // console.log(res.data)
            return res.data
        }
    })

    if (loading) {
        <span className="loading loading-spinner loading-lg"></span>
    }

    // Send the request backend 
    const handleRequest = (request) => {
        console.log(request)

        const requestInfo = {
            assetName: request.name,
            assetImg: request.productImg,
            assetType: request.productType,
            assetQuantity: request.quantity,
            availability: request.available,
            timeDate: request.time,
            status, requesterEmail, requestername

        }

        axiosPublic.post('/asset-request', requestInfo)
            .then(res => {
                if (res?.data?.insertedId) {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        title: 'Well done',
                        text: `Your ${requestInfo.assetName} request succesfull`,
                        footer: '<a href="">Thank you</a>'
                    });
                }
                console.log(res.data)
            })
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

            <h1 className="text-3xl my-5 font-semibold">Requested Asset:</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg font-semibold  text-black">
                            <th>No.</th>
                            <th>Assets Name</th>
                            <th>Type</th>
                            <th>Availability</th>
                            <th>Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assets.map((asset, idx) => <tr key={asset._id}>
                                <th>{idx + 1}</th>
                                <td>{asset.name}</td>
                                <td>{asset.productType}</td>
                                <td>{asset.available}</td>
                                <td>
                                    {
                                        asset?.available === "Out-of-stock" ?
                                            <button disabled className="btn bg-[#44426E] text-white">Request</button>
                                            :
                                            <button
                                                onClick={() => handleRequest(asset)}
                                                className="btn bg-[#44426E] text-white">Request</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetRequest;