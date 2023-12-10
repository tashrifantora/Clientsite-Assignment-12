// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";

import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import useAxiosPublic from "../../Hooks/useAxiosPublic";



const UpdateAsset = () => {
    const asset = useLoaderData();
    const axiosPublic = useAxiosPublic()
    console.log(asset)

    const handleAssetUpdate = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const productImg = form.image.value;
        const productType = form.type.value;
        const quantity = form.quantity.value;
        const assetInfo = {
            name, productImg, productType, quantity
        }
        console.log(assetInfo);

        // Send BackEnd For Patch
        const res = axiosPublic.patch('/assets', assetInfo)
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
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
            <h1 className="text-4xl text-center font-semibold my-10">Add Asset (HR)</h1>

            <div className="lg:w-1/2 md:w-full items-center mx-auto border rounded-lg p-8 bg-slate-200">
                <form onSubmit={handleAssetUpdate}>
                    <div className="  mb-8">
                        {/* Product Name */}
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Product Name :</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={asset.name} type="text" name="name" placeholder="Product Name" className="input input-bordered w-full" />
                            </label>
                        </div>
                        {/* Product Photo */}
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Product Image :</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={asset.productImg} type="photo" name="image" placeholder="Product photo(URL)" className="input input-bordered w-full" />
                            </label>
                        </div>

                        {/* Product Type */}
                        <div className="form-control mb-3 mt-3 ">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Product Type :</span>
                            </label>
                            <select defaultValue={asset.productType} name="type" className="select select-bordered w-full">
                                <option disabled selected>Select Type</option>
                                <option value={'electronics'}>Electronics</option>
                                <option value={'furniture'}>Furniture</option>
                                <option value={'office-supplies'}>Office Supplies</option>
                                <option value={'IT-equipment'}> IT Equipment</option>
                            </select>
                        </div>

                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Product Quantity :</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={asset.quantity} type="number" name="quantity" placeholder="product Quantity" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <input type="submit" value="Update Asset" className="btn w-1/2  bg-[#44425E] text-white text-lg" />
                    </div>

                </form>
            </div>

        </div>
    );
};

export default UpdateAsset;