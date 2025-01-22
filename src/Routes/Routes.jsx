import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import JoinAsEmployee from "../Pages/JoinAsEmployee/JoinAsEmployee";
import JoinAsHR from "../Pages/JoinAsHR/JoinAsHR";
import AddAsset from "../Pages/AddAsset/AddAsset";
import AssetList from "../Pages/AssetList/AssetList";
import AllRequest from "../Pages/AllRequest/AllRequest";
import MyEmployeeList from "../Pages/MyEmployeeList/MyEmployeeList";
import AddEmployee from "../Pages/AddEmployee/AddEmployee";
import AdminRoute from "./AdminRoute/AdminRoute";
import EmployeeTeam from "../Pages/EmployeeTeam/EmployeeTeam";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      // employee
      {
        path:"employeeTeam",
        element:<EmployeeTeam></EmployeeTeam>
      },


      // for Admin
      {
        path: "/joinAsEmployee",
        element: <JoinAsEmployee></JoinAsEmployee>,
      },
      {
        path: "/joinAsHR",
        element: <JoinAsHR></JoinAsHR>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/addAsset",
        element: <AdminRoute><AddAsset></AddAsset></AdminRoute>,
      },
      {
        path: "/assetList",
        element: <AdminRoute><AssetList></AssetList></AdminRoute>,
      },
      {
        path: "/allRequest",
        element: <AdminRoute><AllRequest></AllRequest></AdminRoute>,
      },
      {
        path: "/myTeam",
        element: <AdminRoute><MyEmployeeList></MyEmployeeList></AdminRoute>,
      },
      {
        path: "/addEmployee",
        element: <AdminRoute><AddEmployee></AddEmployee></AdminRoute>,
      },
    ],
  },
]);
