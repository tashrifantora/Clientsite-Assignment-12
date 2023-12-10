import moment from "moment/moment";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import useAuth from "../../Hooks/useAuth";

const AddAsset = () => {
    const { loading } = useAuth()
    const axiosPublic = useAxiosPublic()

    const handleAssetAdd = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const productImg = form.image.value;
        const productType = form.type.value;
        const available = form.available.value;
        const quantity = form.quantity.value;
        const time = moment().format('MMMM Do YYYY')
        const assetInfo = {
            name, productImg, productType, quantity, time, available
        }
        console.log(assetInfo);


        // Send to BackEnd 
        axiosPublic.post('/assets', assetInfo)
            .then(res => {
                if (res?.data?.insertedId) {
                    form.reset();
                    Swal.fire({
                        icon: 'success',
                        title: 'Well done',
                        text: 'Asset added succesfully',
                        footer: '<a href="">Thank you</a>'
                    });

                }
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    if (loading) {
        <span className="loading loading-spinner loading-lg"></span>
    }
    return (
        <div>
            <h1 className="text-4xl text-center font-semibold my-10">Add Asset (HR)</h1>

            <div className="lg:w-1/2 md:w-full items-center mx-auto border rounded-lg p-8 bg-slate-200">
                <form onSubmit={handleAssetAdd}>
                    <div className="  mb-8">
                        {/* Product Name */}
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Product Name :</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="name" placeholder="Product Name" className="input input-bordered w-full" />
                            </label>
                        </div>
                        {/* Product Photo */}
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Product Image :</span>
                            </label>
                            <label className="input-group">
                                <input type="photo" name="image" placeholder="Product photo(URL)" className="input input-bordered w-full" />
                            </label>
                        </div>

                        {/* Product Type */}
                        <div className="form-control mb-3 mt-3 ">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Product Type :</span>
                            </label>
                            <select name="type" className="select select-bordered w-full">
                                <option disabled selected>Select Type</option>
                                <option value={'returnable'}>Returnable</option>
                                <option value={'non-returbable'}>Non Returbable</option>
                            </select>
                        </div>

                        {/* Product Type */}
                        <div className="form-control mb-3 mt-3 ">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Availability :</span>
                            </label>
                            <select name="available" className="select select-bordered w-full">
                                <option disabled selected>Select Type</option>
                                <option value={'available'}>Available</option>
                                <option value={'Out-of-stock'}>Out of stock</option>
                            </select>
                        </div>

                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Product Quantity :</span>
                            </label>
                            <label className="input-group">
                                <input type="number" name="quantity" placeholder="product Quantity" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <input type="submit" value="Add Asset" className="btn w-1/2  bg-[#44425E] text-white text-lg" />
                    </div>

                </form>
            </div>

        </div>
    );
};

export default AddAsset;