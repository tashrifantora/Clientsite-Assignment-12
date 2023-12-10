import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from '../../assets/asset-catalyst-logo-White.png'
import { FcHome } from "react-icons/fc";
import { MdOutlineRequestPage, MdWork } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { BsMicrosoftTeams } from "react-icons/bs";
import { MdDashboardCustomize, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import { FaCrown, FaHome, FaList, FaUserCheck, FaUserTie } from "react-icons/fa";
import { MdLogin, MdLogout } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";



const NavBar = () => {
    const { user, userSignOut, loading } = useAuth();
    const navigate = useNavigate()
    const handleLogOut = () => {
        userSignOut();
        navigate('/login');
    }
    const [isAdmin] = useAdmin();
    if (loading) {
        <span className="loading loading-spinner loading-lg text-black"></span>
    }
    const navLinks = <>
        <li className="text-white text-lg font-semibold"><Link to="/home"><FaHome className="lg:text-2xl"></FaHome>Home</Link></li>
        <li className="text-white text-lg font-semibold"><Link to="/join-employee"><FaUserTie className="lg:text-2xl"></FaUserTie>Join as Employee</Link></li>
        <li className="text-white text-lg font-semibold"><Link to="/join-HR"><FaCrown className="lg:text-2xl"></FaCrown>Join as HR</Link></li>
        {
            user?.email ? <li onClick={handleLogOut} className="text-white text-lg font-semibold"><Link><MdLogout className="lg:text-2xl"></MdLogout>Logout</Link></li>
                :
                <li className="text-white text-lg font-semibold"><Link to="/login"><MdLogin className="lg:text-2xl"></MdLogin>Login</Link></li>
        }
    </>

    const adminNavLink =
        <>
            <li className="text-white text-lg font-semibold"><Link to='/admin/admin-home'><FcHome className="lg:text-2xl"></FcHome>Admin Home</Link></li>
            <li className="text-white text-lg font-semibold"><Link to='/admin/asset-list'><FaList className="lg:text-2xl"></FaList>Asset List</Link></li>
            <li className="text-white text-lg font-semibold"><Link to='/admin/add-asset'><MdLibraryAdd className="lg:text-2xl"></MdLibraryAdd>Add Asset</Link></li>
            <li className="text-white text-lg font-semibold"><Link to='/admin/all-request'><MdFormatListBulleted className="lg:text-2xl"></MdFormatListBulleted>All Request</Link></li>
            <li className="text-white text-lg font-semibold"><Link to='/admin/custom-req-list'><MdDashboardCustomize className="lg:text-2xl"></MdDashboardCustomize>Custome Request List</Link></li>
            <li className="text-white text-lg font-semibold"><Link to='/admin/my-employee-list'><FaUserTie className="lg:text-2xl"></FaUserTie>My Employee List</Link></li>
            <li className="text-white text-lg font-semibold"><Link to='/admin/add-employee'><FaUserCheck className="lg:text-2xl"></FaUserCheck>Add an employee</Link></li>
            <li className="text-white text-lg font-semibold"><Link to='/admin/admin-profile'><ImProfile className="lg:text-2xl"></ImProfile>Profile</Link></li>
        </>


    const employeeNavLink =
        <>
            <li className="text-white text-lg font-semibold"><Link to="/employee/employee-home"><FaHome className="lg:text-2xl"></FaHome>Employee Home</Link></li>
            <li className="text-white text-lg font-semibold"><Link to="/employee/my-asset"><MdWork className="lg:text-2xl"></MdWork>My Asset</Link></li>
            <li className="text-white text-lg font-semibold"><Link to="/employee/my-team"><BsMicrosoftTeams className="lg:text-2xl"></BsMicrosoftTeams>My Team</Link></li>
            <li className="text-white text-lg font-semibold"><Link to="/employee/employee-assetReq"><MdOutlineRequestPage className="lg:text-2xl"></MdOutlineRequestPage>Requested Asset</Link></li>
            <li className="text-white text-lg font-semibold"><Link to="/employee/employee-customReq"><MdDashboardCustomize className="lg:text-2xl"></MdDashboardCustomize>Custom Request</Link></li>
            <li className="text-white text-lg font-semibold"><Link to="/employee/employee-profile"><ImProfile className="lg:text-2xl"></ImProfile>Profile</Link></li>
        </>
    return (
        <div className="">
            <div className="flex ">
                {/* Dashboard side bar */}
                <div className="lg:w-72 lg:p-3 p-1 bg-[#44426E] min-h-screen">
                    <div>
                        <img className="w-44 mt-6" src={logo} alt="" />
                        <h3 className="text-2xl"></h3>
                    </div>


                    {/* Nav Links for user */}
                    <ul className="menu p-4">
                        {navLinks}
                    </ul>

                    <hr />

                    {
                        isAdmin && user ? <>
                            {/* Nav Links for user */}
                            <ul className="menu p-4 ">
                                {adminNavLink}
                            </ul>
                        </>
                            : ""

                    }

                    {
                        !isAdmin && user ? <>
                            <ul className="menu p-4 ">
                                {employeeNavLink}
                            </ul>
                        </>
                            : ""

                    }
                </div>




                {/* Outlet */}
                <div className="flex-1 mx-5 ">
                    <Outlet></Outlet>
                    {/* <Root></Root> */}
                </div>
            </div>

        </div>
    );
};

export default NavBar;