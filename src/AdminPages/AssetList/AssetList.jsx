import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const AssetList = () => {
    const { loading } = useAuth()

    const axiosPublic = useAxiosPublic();
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

    // Delete operation
    const handledeleteAsset = (id) => {
        console.log(id)

        Swal.fire({
            title: "Are you sure!!",
            text: "You want to delete?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {

                // TODO: Have to chance it with [AxiousSecure]
                axiosPublic.delete(`/assets/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Well done',
                                text: `Deleted successfully`,
                                footer: '<a href="">Thank you</a>'
                            });
                            refetch()
                        }
                    })
            }
        });

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

            <h1 className="text-4xl font-semibold text-left my-5">All Assets List: {assets.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg text-black">
                            <th>No</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Date & Time</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assets.map((asset, idx) => <tr key={asset._id}>
                                <td className="font-bold">{idx + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squire rounded-lg w-20 h-20">
                                                <img src={asset.productImg} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-semibold">
                                    {asset.name}
                                </td>
                                <td className="  md:text-center ">{asset.quantity}</td>
                                <td>{asset.time}</td>

                                <td>
                                    <Link to={`/admin/update-asset/${asset._id}`}>
                                        <FaRegEdit
                                            className="text-lg  bg-[#44426E] h-[40px] w-[50px] p-2 rounded text-white cursor-pointer"></FaRegEdit>
                                    </Link>
                                </td>

                                <td><FaTrash onClick={() => handledeleteAsset(asset._id)} className="text-lg  bg-[#44426E] h-[40px] w-[50px] p-2 rounded text-white cursor-pointer"></FaTrash></td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AssetList;