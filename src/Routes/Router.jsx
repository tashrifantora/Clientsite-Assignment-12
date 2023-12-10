import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import JoinEmployee from "../MainPage/JoinEmployee/JoinEmployee";
import JoinHR from "../MainPage/JoinHR/JoinHR";
import Home from "../MainPage/MainPageHome/Home/Home";
import Login from "../MainPage/Login/Login";
import AdminHome from "../AdminPages/AdminHome/AdminHome";
import EmployeeHome from "../EmployeePages/EmployeeHome/EmployeeHome";
import PaymentPage from "../AdminPages/PaymentPage/PaymentPage";
import AddAsset from "../AdminPages/AddAsset/AddAsset";
import AssetList from "../AdminPages/AssetList/AssetList";
import UpdateAsset from "../AdminPages/UpdateAsset/UpdateAsset";
import MyAsset from "../EmployeePages/MyAsset/MyAsset";
import CustomReq from "../EmployeePages/CustomReq/CustomReq";
import UpdateCustomeReq from "../EmployeePages/UpdateCustomReq/UpdateCustomeReq";
import AssetRequest from "../EmployeePages/AssetRequest/AssetRequest";
import EmployeeProfile from "../EmployeePages/EmployeeProfile/EmployeeProfile";
import AdminProfile from "../AdminPages/AdminProfile/AdminProfile";

import AddEmployee from "../AdminPages/AddEmployee/AddEmployee";
import MyEmployeeList from "../AdminPages/MyEmployeeList/MyEmployeeList";
import CustomReqList from "../AdminPages/CustomReqList/CustomReqList";
import AllRequest from "../AdminPages/AllRequests/AllRequest";
import MyTeam from "../EmployeePages/MyTeam/MyTeam";






export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <Home></Home>
            },
            {
                path: "/join-employee",
                element: <JoinEmployee></JoinEmployee>
            },
            {
                path: "/join-HR",
                element: <JoinHR></JoinHR>
            },
            {
                path: "/login",
                element: <Login></Login>
            },

        ]
    },

    // Route For Admin
    {
        path: "admin",
        element: <Root></Root>,
        children: [
            {
                path: "admin-home",
                element: <AdminHome></AdminHome>
            },
            {
                path: "add-asset",
                element: <AddAsset></AddAsset>
            },
            {
                path: "asset-list",
                element: <AssetList></AssetList>
            },
            {
                path: "admin-profile",
                element: <AdminProfile></AdminProfile>
            },

            {
                path: "add-employee",
                element: <AddEmployee></AddEmployee>
            },
            {
                path: "custom-req-list",
                element: <CustomReqList></CustomReqList>
            },
            {
                path: "all-request",
                element: <AllRequest></AllRequest>,
                loader: () => fetch('https://asset-catalyst-server.vercel.app/asset-request')
            },
            {
                path: "my-employee-list",
                element: <MyEmployeeList></MyEmployeeList>
            },
            {
                path: "/admin/payment",
                element: <PaymentPage></PaymentPage>
            },
            {
                path: "update-asset/:id",
                element: <UpdateAsset></UpdateAsset>,
                loader: ({ params }) => fetch(`https://asset-catalyst-server.vercel.app/assets/${params.id}`)
            },

        ]
    },

    // Route for empployee

    {
        path: "employee",
        element: <Root></Root>,
        children: [
            {
                path: "employee-home",
                element: <EmployeeHome></EmployeeHome>
            },
            // Painding
            {
                path: "my-asset",
                element: <MyAsset></MyAsset>
            },
            {
                path: "employee-customReq",
                element: <CustomReq></CustomReq>
            },
            {
                path: "employee-assetReq",
                element: <AssetRequest></AssetRequest>
            },
            {
                path: "employee-profile",
                element: <EmployeeProfile></EmployeeProfile>
            },
            {
                path: "my-team",
                element: <MyTeam></MyTeam>,
                loader: () => fetch('https://asset-catalyst-server.vercel.app/HR')
            },
            {
                path: "update-req/:id",
                element: <UpdateCustomeReq></UpdateCustomeReq>,
                loader: ({ params }) => fetch(`https://asset-catalyst-server.vercel.app/custom-req/${params.id}`)
            },
        ]
    }
])

