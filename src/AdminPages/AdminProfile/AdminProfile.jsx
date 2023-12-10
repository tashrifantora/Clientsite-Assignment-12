import boss from '../../assets/Image/boss.jpg'
import useAuth from "../../Hooks/useAuth";



const AdminProfile = () => {
    const { user, loading } = useAuth()

    if (loading) {
        <span className="loading loading-spinner loading-lg"></span>
    }

    console.log(user)
    return (
        <div >
            <div className="flex justify-between items-center gap-10 w-11/12 mx-auto mt-20">
                <div className="lg:w-1/2  mx-auto p-8 mt-12 rounded-lg bg-slate-100">
                    <div className="w-full">
                        <img className="w-1/5 mx-auto rounded-full" src={user?.photoURL} alt="" />
                        <div className="p-12">
                            <h2 className="mb-5">
                                <span className="text-3xl font-bold mr-4">Name:</span> <span className="text-3xl">{user?.displayName}</span>
                            </h2>

                            <h2>
                                <span className="text-3xl font-bold mr-4">Email:</span> <span className="text-3xl">{user?.email}</span>
                            </h2>
                        </div>
                    </div>
                </div>

                <img className="lg:w-5/12 rounded-lg" src={boss} alt="" />
            </div>
        </div>
    );
};

export default AdminProfile;