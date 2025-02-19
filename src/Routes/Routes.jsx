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
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import EmployeeAssets from "../Pages/EmployeeAssets/EmployeeAssets";
import AssetsRequest from "../Pages/AssetsRequest/AssetsRequest";
import IncreaseLimit from "../Pages/IncreaseLimit/IncreaseLimit";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import Pricing from "../Pages/Pricing/Pricing";
import UsersReview from "../Pages/UsersReview/UsersReview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/pricing",
        element: <Pricing></Pricing>,
      },
      {
        path: "/User-Reviews",
        element: <UsersReview></UsersReview>,
      },
      {
        path: "/myProfile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "/payment",
        element: <PaymentPage></PaymentPage>,
      },

      // employee
      {
        path: "employeeTeam",
        element: <EmployeeTeam></EmployeeTeam>,
      },
      {
        path: "employeeAssets",
        element: <EmployeeAssets></EmployeeAssets>,
      },
      {
        path: "assetsRequest",
        element: <AssetsRequest></AssetsRequest>,
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
        element: (
          <AdminRoute>
            <AddAsset></AddAsset>
          </AdminRoute>
        ),
      },
      {
        path: "/assetList",
        element: (
          <AdminRoute>
            <AssetList></AssetList>
          </AdminRoute>
        ),
      },
      {
        path: "/allRequest",
        element: (
          <AdminRoute>
            <AllRequest></AllRequest>
          </AdminRoute>
        ),
      },
      {
        path: "/myTeam",
        element: (
          <AdminRoute>
            <MyEmployeeList></MyEmployeeList>
          </AdminRoute>
        ),
      },
      {
        path: "/addEmployee",
        element: (
          <AdminRoute>
            <AddEmployee></AddEmployee>
          </AdminRoute>
        ),
      },
      {
        path: "/increaseLimit",
        element: (
          <AdminRoute>
            <IncreaseLimit></IncreaseLimit>
          </AdminRoute>
        ),
      },
    ],
  },
]);
