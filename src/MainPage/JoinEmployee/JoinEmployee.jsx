import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import googlelogo from '../../assets/Image/googleLogo.png'
import useAuth from '../../Hooks/useAuth'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { useNavigate } from 'react-router-dom'
// import useAxiosSecure from '../../Hooks/useAxiosSecure'

const JoinEmployee = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();
    // const axiousSecure = useAxiosSecure()
    const navigate = useNavigate()

    const handleEmployee = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const birthday = form.birthDate.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        const emplyeeInfo = { name, birthday, email, password, photo }
        console.log(emplyeeInfo);

        // Authentication
        createUser(email, password)
            .then(result => {
                const signinUser = result.user;
                console.log(signinUser)

                // Update user profile
                updateUserProfile(name, birthday, photo)
                    .then(() => {
                        const employeeInfo = {
                            name: name,
                            email: email,
                            DOB: birthday,
                            photo: photo
                        }
                        console.log(employeeInfo)

                        // Send to Backend
                        axiosPublic.post('/employee', employeeInfo)
                            .then(res => {
                                if (res.data?.insertedId) {
                                    form.reset();
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Well done',
                                        text: 'Your application succesfull',
                                        footer: '<a href="">Thank you</a>'
                                    });
                                    navigate('/employee/employee-home')
                                }
                                console.log(res.data)
                            })

                    })

            })
            .catch(error => {
                console.log(error)
            })

    }


    // SignIn with google
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user)
                const employeeInfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                }

                // Send to BAckend
                axiosPublic.post('/employee', employeeInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate('/')
                    })
            })
    }

    return (
        <div className='mx-5 md:mx-10'>
            <h1 className='text-4xl lg:text-5xl text-center font-semibold my-20'> New <span className='text-4xl lg:text-5xl font-bold'>Employee</span></h1>

            <form onSubmit={handleEmployee}>

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
                            <input type="date" name="birthDate" placeholder="Date of Birth" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                {/* email */}
                <div className="md:flex gap-10">

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
                            <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>

                <div className="md:flex gap-10 mb-12">
                    {/* Photo */}
                    <div className="form-control md:w-1/2 mt-5">
                        <label className="label">
                            <span className="label-text text-xl font-semibold">Photo</span>
                        </label>
                        <label className="input-group">
                            <input type="photo" name="photo" placeholder="Photo (URL)" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>


                <input type="submit" value="Signup" className="btn btn-block bg-[#44425E] text-white text-lg" />
            </form>

            <div className="divider my-4">OR</div>
            <button onClick={handleGoogleSignIn}
                className="btn btn-block text-lg bg-[#44425E] text-white">
                <img className='w-6' src={googlelogo} alt="" />
                Login with Google
            </button>

        </div>
    );
};

export default JoinEmployee;

