import React from "react";
import { Button, Navbar } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import CustomBtn from "../CustomBtn/CustomBtn";

const Nav = () => {
  const links = (
    <>
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
      <NavLink
        to="/employeeReg"
        className={({ isActive }) =>
          isActive
            ? "text-blue-700 dark:text-white font-semibold"
            : "text-gray-700 dark:text-gray-400"
        }
      >
        Join as Employee
      </NavLink>
      <NavLink
        to="/hrReg"
        className={({ isActive }) =>
          isActive
            ? "text-blue-700 dark:text-white font-semibold"
            : "text-gray-700 dark:text-gray-400"
        }
      >
        Join as HR Manager
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive
            ? "text-blue-700 dark:text-white font-semibold"
            : "text-gray-700 dark:text-gray-400"
        }
      >
        <CustomBtn text={"Login"}></CustomBtn>
      </NavLink>
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
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            SmartTrack
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />

        <div className="flex flex-col sm:flex-row sm:space-x-4 items-center">
          {links}
        </div>
      </Navbar>
    </div>
  );
};

export default Nav;
