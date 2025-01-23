import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Navbar,
  NavbarCollapse,
  Tooltip,
} from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [isAdmin] = useAdmin();
  const [cUser,setCUser] = useState({})

  useEffect(()=>{
    axiosPublic.get("/users")
    .then(res => {
    const currentUser=  res.data.find(r=> r.email === user?.email);
    setCUser(currentUser);
    })
  },[])

  // Logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logout Successful",
          background: "#003333",
          color: "#fff",
          confirmButtonColor: "#001919",
          showClass: {
            popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
          },
          hideClass: {
            popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const links = (
    <>
      {/* Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-700 dark:text-white font-semibold"
            : "text-gray-700 dark:text-gray-400"
        }
      >
        Home
      </NavLink>

      {/* Asset List For Admin */}
      {user && isAdmin && (
        <NavLink
          to="/assetList"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 dark:text-white font-semibold"
              : "text-gray-700 dark:text-gray-400"
          }
        >
          Asset List
        </NavLink>
      )}

      {/* Add Asset For Admin */}
      {user && isAdmin && (
        <NavLink
          to="/addAsset"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 dark:text-white font-semibold"
              : "text-gray-700 dark:text-gray-400"
          }
        >
          Add an Asset
        </NavLink>
      )}

      {/* Request to join team Fro Admin */}
      {user && isAdmin && (
        <NavLink
          to="/allRequest"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 dark:text-white font-semibold"
              : "text-gray-700 dark:text-gray-400"
          }
        >
          All Requests
        </NavLink>
      )}

      {/* My Team for Admin */}
      {user && isAdmin && (
        <NavLink
          to="/myTeam"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 dark:text-white font-semibold"
              : "text-gray-700 dark:text-gray-400"
          }
        >
          My Employee List
        </NavLink>
      )}

      {/* Add an Employee for Admin */}
      {user && isAdmin && (
        <NavLink
          to="/addEmployee"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 dark:text-white font-semibold"
              : "text-gray-700 dark:text-gray-400"
          }
        >
          Add an Employee
        </NavLink>
      )}

      {/* My Assets For Employee */}
      {user && !isAdmin && (
        <NavLink
          to="/myAsstes"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 dark:text-white font-semibold"
              : "text-gray-700 dark:text-gray-400"
          }
        >
          My Assets
        </NavLink>
      )}

      {/* My Assets For Employee */}
      {user && !isAdmin && (
        <NavLink
          to="/employeeTeam"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 dark:text-white font-semibold"
              : "text-gray-700 dark:text-gray-400"
          }
        >
          My Team
        </NavLink>
      )}

      {/* My Assets For Employee */}
      {user && !isAdmin && (
        <NavLink
          to="/assetsRequest"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 dark:text-white font-semibold"
              : "text-gray-700 dark:text-gray-400"
          }
        >
          Request for an Asset
        </NavLink>
      )}

      {/* Profile */}
      {user && (
        <NavLink to="/myProfile">
          <Tooltip content={user?.displayName}>
            <Avatar  img={cUser?.photo} rounded bordered color="success" />
          </Tooltip>
        </NavLink>
      )}

      {/* For not Logged in Users */}
      {!user && (
        <NavLink
          to="/joinAsEmployee"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 dark:text-white font-semibold"
              : "text-gray-700 dark:text-gray-400"
          }
        >
          Join as Employee
        </NavLink>
      )}

      {/* For not Logged in Users */}
      {!user && (
        <NavLink
          to="/joinAsHR"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 dark:text-white font-semibold"
              : "text-gray-700 dark:text-gray-400"
          }
        >
          Join as HR Manager
        </NavLink>
      )}

      {user ? (
        <li>
          <button
            onClick={handleLogOut}
            className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 hover:animate-pulse"
          >
            Logout
          </button>
        </li>
      ) : (
        <li>
          <NavLink
            className={
              "inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 hover:animate-pulse"
            }
            to={"/login"}
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-10 backdrop-blur-xl w-11/12 mx-auto rounded-3xl">
      <Navbar
        fluid
        rounded
        className="bg-cyan-300 text-black bg-opacity-40 rounded-2xl mt-4"
      >
        <Navbar.Brand>
          <img src="" className="mr-3 h-6 sm:h-9" alt="" />
          {user && isAdmin ?
           (
            <img className="w-16" src={user?.photoURL} alt="" />
          ): (
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            SmartTrack
          </span>
          ) }
        </Navbar.Brand>
        <Navbar.Toggle />
        <NavbarCollapse>
          <div className="flex flex-col sm:flex-row sm:space-x-4 items-center">
            {links}
          </div>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Nav;
