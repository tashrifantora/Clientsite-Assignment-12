import moment from "moment";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import useAuth from "../../Hooks/useAuth";


const CustomReq = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useAuth();
    const requesterEmail = user?.email;
    const requestername = user?.displayName;


    if (loading) {
        <span className="loading loading-spinner loading-lg text-black"></span>
    }


    const handleCustomReq = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const assetImg = form.image.value;
        const assetPrice = form.price.value;
        const assetType = form.type.value;
        const whyNeed = form.whyNeed.value;
        const aditional = form.aditional.value;
        const date = moment().format('MMMM Do YYYY')
        const status = 'panding'
        const customReqInfo = {
            name, assetImg, assetPrice, assetType, whyNeed, aditional, date, status, requestername, requesterEmail
        }
        console.log(customReqInfo)

        // Set to Back end
        axiosPublic.post('/custom-req', customReqInfo)
            .then(res => {
                if (res?.data?.insertedId) {
                    form.reset();
                    Swal.fire({
                        icon: 'success',
                        title: 'Well done',
                        text: `Your ${customReqInfo.name} request succesfull`,
                        footer: '<a href="">Thank you</a>'
                    });
                }
                console.log(res.data)
            })
    }

    return (
        <div>
            <h1 className="text-4xl text-center font-semibold my-10">Custome Request</h1>

            <div className="lg:w-11/12 md:w-full items-center mx-auto border rounded-lg p-8 bg-slate-200">
                <form onSubmit={handleCustomReq}>
                    <div className="mb-8">
                        <div className="md:flex gap-10 mb-8">
                            {/* Product Name */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Asset Name :</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="name" placeholder="Asset Name" className="input input-bordered w-full" />
                                </label>
                            </div>

                            {/* Product Photo */}
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Asset Image :</span>
                                </label>
                                <label className="input-group">
                                    <input type="photo" name="image" placeholder="Asset photo(URL)" className="input input-bordered w-full" />
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
                                    <input type="text" name="price" placeholder="Asset Price" className="input input-bordered w-full" />
                                </label>
                            </div>

                            {/* Asset Type */}
                            <div className="form-control w-full mb-3  ">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Product Type :</span>
                                </label>
                                <select name="type" className="select select-bordered w-full">
                                    <option disabled selected>Select Type</option>
                                    <option value={'returnable'}>ReturnAble</option>
                                    <option value={'non-returnAble'}>Non ReturnAble</option>
                                </select>
                            </div>
                        </div>

                        <div className="md:flex gap-10 mb-8">
                            {/* Why need */}
                            <div className="form-control mb-3 mt-3 w-full">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Why needed :</span>
                                </label>
                                <textarea name="whyNeed" placeholder="Explain Why need..." className="textarea textarea-bordered textarea-lg w-full " ></textarea>
                            </div>

                            {/* Aditional info*/}
                            <div className="form-control mb-3 mt-3 w-full">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Aditional Info :</span>
                                </label>
                                <textarea placeholder="Aditional Info" name="aditional" className="textarea textarea-bordered textarea-lg w-full " ></textarea>
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

export default CustomReq;