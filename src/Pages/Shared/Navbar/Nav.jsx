import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Navbar,
  NavbarCollapse,
  Tooltip,
} from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();
  const [isAdmin] = useAdmin();
  const [cUser, setCUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/users/${user.email}`)
        .then((res) => {
          setCUser(res.data);
        })
        .catch((err) => {
          // console.error("Error fetching user data:", err);
        });
    }
  }, [user, axiosPublic]);

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
        navigate("/");
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const links = (
    <>
      {/* Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-white font-bold dark:text-white"
            : "text-gray-700  dark:text-gray-400 hover:text-white"
        }
      >
        Home
      </NavLink>

      {/* Pricing */}
      {!user && (
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold dark:text-white"
              : "text-gray-700  dark:text-gray-400 hover:text-white"
          }
        >
          All Plan
        </NavLink>
      )}
      {/* User-Reviews */}
      {!user && (
        <NavLink
          to="/User-Reviews"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold dark:text-white"
              : "text-gray-700  dark:text-gray-400 hover:text-white"
          }
        >
          User Reviews
        </NavLink>
      )}

      {/* Admin */}
      {/* Asset List For Admin */}
      {user && isAdmin && (
        <NavLink
          to="/assetList"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold dark:text-white  "
              : "text-gray-700  dark:text-gray-400 hover:text-white"
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
              ? "text-white font-bold dark:text-white "
              : "text-gray-700  dark:text-gray-400 hover:text-white"
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
              ? "text-white font-bold dark:text-white  "
              : "text-gray-700  dark:text-gray-400 hover:text-white"
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
              ? "text-white font-bold dark:text-white  "
              : "text-gray-700  dark:text-gray-400 hover:text-white"
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
              ? "text-white font-bold dark:text-white  "
              : "text-gray-700  dark:text-gray-400 hover:text-white"
          }
        >
          Add an Employee
        </NavLink>
      )}

      {/* Employee */}
      {/* My Assets For Employee */}
      {user && !isAdmin && (
        <NavLink
          to="/employeeAssets"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold dark:text-white  "
              : "text-gray-700  dark:text-gray-400 hover:text-white"
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
              ? "text-white font-bold dark:text-white  "
              : "text-gray-700  dark:text-gray-400 hover:text-white"
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
              ? "text-white font-bold dark:text-white  "
              : "text-gray-700  dark:text-gray-400 hover:text-white"
          }
        >
          Request for an Asset
        </NavLink>
      )}

      {/* Profile */}
      {user && (
        <NavLink to="/myProfile">
          <Tooltip content={user?.displayName}>
            <img
              referrerPolicy="no-referrer"
              className="rounded-full w-12 h-12"
              src={cUser?.photo}
              alt=""
            />
          </Tooltip>
        </NavLink>
      )}

      {/* For not Logged in Users */}
      {!user && (
        <NavLink
          to="/joinAsEmployee"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold dark:text-white  "
              : "text-gray-700  dark:text-gray-400 hover:text-white"
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
              ? "text-white font-bold dark:text-white  "
              : "text-gray-700  dark:text-gray-400 hover:text-white"
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
    <div className="sticky top-0 z-50 bg-cyan-400">
      <Navbar
        fluid
        rounded
        className="text-black bg-transparent w-11/12 mx-auto"
      >
        <Navbar.Brand>
          {user && isAdmin ? (
            <img
              className="w-16 h-16 rounded-full"
              src={cUser?.companyLogo}
              alt=""
            />
          ) : (
            <button className="self-center whitespace-nowrap text-xl dark:text-white font-bold">
              SmartTrack
            </button>
          )}
        </Navbar.Brand>
        <Navbar.Toggle />
        <NavbarCollapse>
          <div className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-2 lg:space-x-4 items-center">
            {links}
          </div>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Nav;
