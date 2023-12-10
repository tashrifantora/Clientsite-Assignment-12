import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import employee from '../../assets/Image/9650007_7566.jpg'
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const EmployeeProfile = () => {
    const { user } = useAuth();




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

                <img className="lg:w-7/12 rounded-lg" src={employee} alt="" />
            </div>
        </div>
    );
};

export default EmployeeProfile;