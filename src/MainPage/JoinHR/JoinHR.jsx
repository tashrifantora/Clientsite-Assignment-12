import useAuth from "../../Hooks/useAuth";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const JoinHR = () => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleHr = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const birthday = form.birthDay.value;
        const companyName = form.companyName.value;
        const companyLogo = form.CompanyLogo.value;
        const email = form.email.value;
        const password = form.password.value;
        const offerPackage = form.offerpackage.value;

        const HrInfo = { name, birthday, companyName, companyLogo, email, password, offerPackage }

        console.log(HrInfo)

        createUser(email, password)
            .then(result => {
                const signinUser = result.user;
                console.log(signinUser)

                // Update user profile
                updateUserProfile(name, birthday, companyLogo)
                    .then(() => {
                        const employeeInfo = {
                            name: name,
                            email: email,
                            dob: birthday,
                            companyName: companyName,
                            companyLogo: companyLogo,
                            pakage: offerPackage

                        }
                        console.log(employeeInfo)

                        // Send to Backend
                        axiosPublic.post('/HR', employeeInfo)
                            .then(res => {
                                if (res?.data?.insertedId) {
                                    form.reset();
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Well done',
                                        text: 'Your application succesfull',
                                        footer: '<a href="">Thank you</a>'
                                    });
                                    navigate('/admin/payment')
                                }
                                console.log(res.data)
                            })

                    })

            })
            .catch(error => {
                console.log(error)
            })
    }




    return (
        <div className='mx-5 md:mx-10'>
            <h1 className='text-4xl lg:text-5xl text-center font-semibold my-20'> New <span className='text-4xl lg:text-5xl font-bold'>Employee</span> (HR)</h1>

            <form onSubmit={handleHr}>

                <div className="md:flex gap-10 mb-8">
                    {/* Name */}
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl font-semibold">Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    {/* Date of birth */}
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl font-semibold">Date of Birth</span>
                        </label>
                        <label className="input-group">
                            <input type="date" name="birthDay" placeholder="Date of Birth" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                <div className="md:flex gap-10 mb-8">
                    {/* Company Name */}
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl font-semibold">Company name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="companyName" placeholder="Company name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    {/*Company logo */}
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl font-semibold">Company Logo</span>
                        </label>
                        <label className="input-group">
                            <input type="photo" name="CompanyLogo" placeholder="Company Logo(URL)" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                {/* email */}
                <div className="md:flex gap-10 mb-12">

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl font-semibold">Email</span>
                        </label>
                        <label className="input-group">
                            <input type="email" name="email" placeholder="Your email" className="input input-bordered w-full" />
                        </label>
                    </div>

                    {/* Password */}
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl font-semibold">Password</span>
                        </label>
                        <label className="input-group">
                            <input type="password" name="password" placeholder="Your Password" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                <div className="md:flex gap-10 mb-12">

                    <div className="form-control md:w-1/2">
                        <select name="offerpackage" className="select select-bordered w-full">
                            <option disabled selected>Select package</option>
                            <option value={5}>5 Members for $5</option>
                            <option value={8}>10 Members for $8</option>
                            <option value={15}>20 Members for $15</option>
                        </select>
                    </div>
                </div>


                <input type="submit" value="Signup" className="btn btn-block bg-[#44425E] text-white text-lg" />

            </form>

        </div>
    );
};

export default JoinHR;