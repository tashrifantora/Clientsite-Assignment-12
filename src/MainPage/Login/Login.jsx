import loginlogo from '../../assets/Image/login.jpg'
import useAdmin from '../../Hooks/useAdmin';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
// import useAxiosPublic from '../../Hooks/useAxiosPublic';


const Login = () => {
    const { userSignIn } = useAuth();
    const navigate = useNavigate()
    const [isAdmin] = useAdmin()
    // const axiosPublic = useAxiosPublic()

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password })

        // Authentication SignIN/Login
        userSignIn(email, password)
            .then(result => {
                console.log(result.user);
                if (isAdmin) {
                    navigate('/admin/admin-home')
                }
                else {
                    navigate('/employee/employee-home')
                }


            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='mx-5 md:mx-10'>

            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row justify-between">
                    <div className="card flex-shrink-0 max-w-2xl md:w-4/5 lg:w-3/5">
                        <h1 className='text-4xl lg:text-5xl text-center font-semibold'>Please <span className='text-4xl lg:text-5xl font-bold'>Login</span></h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Email:</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold">Password:</span>
                                </label>
                                <input type="password"
                                    name='password' placeholder="password" className="input input-bordered" required />
                            </div>


                            <div className="form-control mt-4">
                                <input type="submit" value="LOGIN" className="btn bg-[#44425E] text-white" />
                            </div>
                        </form>
                    </div>

                    <img className='md:w-4/5 lg:w-1/2' src={loginlogo} alt="" />

                </div>
            </div>
        </div>
    );
};

export default Login;