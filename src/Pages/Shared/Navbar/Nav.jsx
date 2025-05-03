import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Tooltip,
  Dropdown,
} from "flowbite-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import {
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiHome,
  FiDollarSign,
  FiMessageSquare,
  FiList,
  FiPlus,
  FiUsers,
  FiPackage,
  FiUserPlus,
  FiBriefcase,
} from "react-icons/fi";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../../../provider/ThemeProvider";

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [isAdmin] = useAdmin();
  const [cUser, setCUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/users/${user.email}`).then((res) => {
        setCUser(res.data);
      });
    }
  }, [user, axiosPublic]);

  const handleLogOut = () => {
    logOut().then(() => {
      Swal.fire({
        title: "Logout Successful",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#0891b2",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
      navigate("/");
    });
  };

  const navbarClass = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled
      ? "bg-slate-900 shadow-lg"
      : "bg-gradient-to-r from-slate-800 to-slate-900"
  }`;

  const getDropdownItemClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "flex items-center py-2 px-4 text-sm text-white bg-cyan-700 hover:bg-cyan-800"
      : "flex items-center py-2 px-4 text-sm text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('[data-toggle-menu="true"]')
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        !event.target.closest('[data-toggle-profile="true"]')
      ) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const customTheme = {
    root: {
      base: "bg-transparent px-2 py-2.5 sm:px-4 w-full",
      inner: {
        base: "mx-auto flex flex-wrap items-center justify-between w-full md:w-11/12 lg:w-10/12",
      },
    },
    brand: {
      base: "flex items-center",
    },
    collapse: {
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-2 lg:space-x-4",
    },
    link: {
      base: "block py-2 px-3 md:p-0",
      active: {
        on: "bg-cyan-700 text-white md:bg-transparent md:border-b-2 md:border-cyan-500 md:text-cyan-500",
        off: "border-b-2 border-transparent text-gray-300 hover:bg-gray-700 hover:text-white md:hover:bg-transparent md:hover:text-cyan-400 md:hover:border-cyan-400",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-gray-300 hover:bg-gray-700 hover:text-white md:hidden",
      icon: "h-6 w-6 shrink-0",
    },
  };

  return (
    <div className={navbarClass} ref={navbarRef}>
      <Navbar fluid theme={customTheme} className="px-3 lg:px-5">
        <NavbarBrand as={Link} to="/">
          {user && isAdmin && cUser?.companyLogo ? (
            <img
              src={cUser?.companyLogo}
              className="mr-3 h-10 w-10 rounded-full object-cover"
              alt="Company Logo"
            />
          ) : (
            <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
              <span className="text-cyan-400">Smart</span>Track
            </span>
          )}
        </NavbarBrand>

        <div className="flex items-center md:order-2 space-x-3">
          {user ? (
            <>
              <Tooltip
                content={user?.displayName || "Profile"}
                placement="bottom"
              >
                <NavLink to="/myProfile" className="flex">
                  <Avatar
                    img={cUser?.photo}
                    rounded
                    bordered
                    color="info"
                    alt={user?.displayName}
                    className="transition-transform hover:scale-110"
                  />
                </NavLink>
              </Tooltip>

              <Button
                color="cyan"
                onClick={handleLogOut}
                className="hidden md:flex items-center"
                pill
              >
                <FiLogOut className="mr-2" /> Logout
              </Button>
              <Button
                onClick={toggleTheme}
                color="gray"
                pill
                className="!p-2"
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {darkMode ? (
                  <FiSun className="text-yellow-400" />
                ) : (
                  <FiMoon className="text-black" />
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                color="cyan"
                pill
                className="hidden md:flex"
              >
                Login
              </Button>
              <Button
                onClick={toggleTheme}
                color="gray"
                pill
                className="!p-2"
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {darkMode ? (
                  <FiSun className="text-yellow-400" />
                ) : (
                  <FiMoon className="text-black" />
                )}
              </Button>
            </>
          )}

          <NavbarToggle className="border border-gray-600" />
        </div>

        <NavbarCollapse>
          <NavbarLink as={Link} to="/" active={location.pathname === "/"}>
            <div>Home</div>
          </NavbarLink>

          {!user && (
            <>
              <NavbarLink
                as={Link}
                to="/pricing"
                active={location.pathname === "/pricing"}
              >
                <div>All Plans</div>
              </NavbarLink>

              <NavbarLink
                as={Link}
                to="/User-Reviews"
                active={location.pathname === "/User-Reviews"}
              >
                <div>User Reviews</div>
              </NavbarLink>
            </>
          )}

          {/* Join links for non-logged users */}
          {!user && (
            <>
              <NavbarLink
                as={Link}
                to="/joinAsEmployee"
                active={location.pathname === "/joinAsEmployee"}
              >
                <div>Join as Employee</div>
              </NavbarLink>

              <NavbarLink
                as={Link}
                to="/joinAsHR"
                active={location.pathname === "/joinAsHR"}
              >
                <div>Join as HR</div>
              </NavbarLink>

              {/* Mobile only login button */}
              <div className="md:hidden mt-3">
                <Button as={Link} to="/login" color="cyan" className="w-full">
                  Login
                </Button>
              </div>
            </>
          )}

          {user && isAdmin && (
            <Dropdown
              label={
                <span className="flex items-center text-gray-300">
                  <FiBriefcase className="mr-1" /> Admin
                  <FiChevronDown className="ml-1" />
                </span>
              }
              dismissOnClick={true}
              inline
              arrowIcon={false}
              className="bg-slate-800 border border-slate-700"
            >
              <Dropdown.Item
                as={Link}
                to="/assetList"
                className={getDropdownItemClass("/assetList")}
              >
                <FiList className="mr-2" /> Asset List
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/addAsset"
                className={getDropdownItemClass("/addAsset")}
              >
                <FiPlus className="mr-2" /> Add an Asset
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/allRequest"
                className={getDropdownItemClass("/allRequest")}
              >
                <FiPackage className="mr-2" /> All Requests
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/myTeam"
                className={getDropdownItemClass("/myTeam")}
              >
                <FiUsers className="mr-2" /> My Employee List
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/addEmployee"
                className={getDropdownItemClass("/addEmployee")}
              >
                <FiUserPlus className="mr-2" /> Add an Employee
              </Dropdown.Item>
            </Dropdown>
          )}

          {user && !isAdmin && (
            <>
              <NavbarLink
                as={Link}
                to="/employeeAssets"
                active={location.pathname === "/employeeAssets"}
              >
                <div className="flex items-center">
                  <FiPackage className="mr-1" /> My Assets
                </div>
              </NavbarLink>

              <NavbarLink
                as={Link}
                to="/employeeTeam"
                active={location.pathname === "/employeeTeam"}
              >
                <div className="flex items-center">
                  <FiUsers className="mr-1" /> My Team
                </div>
              </NavbarLink>
            </>
          )}
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Nav;
