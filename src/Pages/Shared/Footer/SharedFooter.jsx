import React, { useContext, useEffect, useState } from "react";
import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SharedFooter = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const axiosPublic = useAxiosPublic();
  const [cUser, setCUser] = useState({});

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

  return (
    <Footer container>
      <div className="w-full">
        <div className="grid justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 w-11/12 mx-auto">
          <div>
            {user && isAdmin ? (
              <img
                className="w-16 h-16 rounded-full"
                src={cUser?.companyLogo}
                alt=""
              />
            ) : (
              <Link to={"/"} className="self-center whitespace-nowrap text-xl font-bold hover:text-cyan-600 dark:text-white">
                SmartTrack
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 gap-8 mt-6 md:mt-0 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Link to={"/"} className="hover:text-cyan-600">SmartTrack</Link>
                <Link to={"/pricing"} className="hover:text-cyan-600">All Plans</Link>
                <Link to={"/User-Reviews"} className="hover:text-cyan-600">User Reviews</Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Link to={"/"}>Github</Link>
                <Link to={"/"}>Discord</Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Link to={"/"}>Privacy Policy</Link>
                <Link to={"/"}>Terms &amp; Conditions</Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-11/12 mx-auto sm:flex sm:items-center sm:justify-between ">
          <Footer.Copyright by="SmartTrack" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon icon={BsFacebook} />
            <Footer.Icon icon={BsInstagram} />
            <Footer.Icon icon={BsTwitter} />
            <Footer.Icon icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default SharedFooter;
