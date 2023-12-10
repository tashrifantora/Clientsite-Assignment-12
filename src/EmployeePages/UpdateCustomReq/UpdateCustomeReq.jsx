import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const UpdateCustomeReq = () => {
    const req = useLoaderData()
    console.log(req)
    const axiosPublic = useAxiosPublic()

    const handleUpdateCustomReq = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const assetImg = form.image.value;
        const assetPrice = form.price.value;
        const assetType = form.type.value;
        const whyNeed = form.whyNeed.value;
        const aditional = form.aditional.value
        const customReqInfo = {
            name, assetImg, assetPrice, assetType, whyNeed, aditional
        }
        console.log(customReqInfo)
        console.log(req._id)

        // Send BackEnd For Patch
        const res = await axiosPublic.patch(`/custom-req/${req._id}`, customReqInfo)

        console.log(res.data)
        if (res?.data?.modifiedCount > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Well done',
                text: ` added successfully`,
                footer: '<a href="">Thank you</a>'
            });
            form.reset();
        }
    }
    return (
        <div>
            <h1 className="text-4xl text-center font-semibold my-10">Update Custome Request</h1>

            <div className="lg:w-11/12 md:w-full items-center mx-auto border rounded-lg p-8 bg-slate-200">
                <form onSubmit={handleUpdateCustomReq}>
                    <div className="mb-8">
                        <div className="md:flex gap-10 mb-8">
                            {/* Product Name */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Asset Name :</span>
                                </label>
                                <label className="input-group">
                                    <input defaultValue={req.name} type="text" name="name" placeholder="Asset Name" className="input input-bordered w-full" />
                                </label>
                            </div>

                            {/* Product Photo */}
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Asset Image :</span>
                                </label>
                                <label className="input-group">
                                    <input defaultValue={req.assetImg} type="photo" name="image" placeholder="Asset photo(URL)" className="input input-bordered w-full" />
                                </label>
                            </div>
                        </div>

                        <div className="md:flex gap-10 mb-8">
                            {/* Product Price */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Asset Price :</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="price" defaultValue={req.assetPrice} placeholder="Asset Price" className="input input-bordered w-full" />
                                </label>
                            </div>

                            {/* Asset Type */}
                            <div className="form-control w-full mb-3  ">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Product Type :</span>
                                </label>
                                <select name="type" defaultValue={req.assetType} className="select select-bordered w-full">
                                    <option disabled selected>Select Type</option>
                                    <option value={'electronics'}>Returnable</option>
                                    <option value={'furniture'}>Non-Returnable</option>
                                </select>
                            </div>
                        </div>

                        <div className="md:flex gap-10 mb-8">
                            {/* Why need */}
                            <div className="form-control mb-3 mt-3 w-full">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Why needed :</span>
                                </label>
                                <textarea name="whyNeed" defaultValue={req.whyNeed} placeholder="Explain Why need..." className="textarea textarea-bordered textarea-lg w-full " ></textarea>
                            </div>

                            {/* Aditional info*/}
                            <div className="form-control mb-3 mt-3 w-full">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Aditional Info :</span>
                                </label>
                                <textarea defaultValue={req.aditional} placeholder="Aditional Info" name="aditional" className="textarea textarea-bordered textarea-lg w-full " ></textarea>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-center">
                        <input type="submit" value="Request Asset" className="btn w-1/2  bg-[#44425E] text-white text-lg" />
                    </div>

                </form>
            </div>

        </div>
    );
};

export default UpdateCustomeReq;