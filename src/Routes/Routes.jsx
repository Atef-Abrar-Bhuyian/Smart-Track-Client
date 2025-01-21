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
        element: <AddAsset></AddAsset>,
      },
      {
        path: "/assetList",
        element: <AssetList></AssetList>,
      },
      {
        path: "/allRequest",
        element: <AllRequest></AllRequest>,
      },
      {
        path: "/myTeam",
        element: <MyEmployeeList></MyEmployeeList>,
      },
      {
        path: "/addEmployee",
        element: <AddEmployee></AddEmployee>,
      },
    ],
  },
]);
