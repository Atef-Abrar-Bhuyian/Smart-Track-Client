import React, { useContext, useEffect, useState } from "react";
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
        .catch(() => {});
    }
  }, [user, axiosPublic]);

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 border-t border-gray-700 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
                <span className="text-cyan-400">Smart</span>Track
              </span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              We're a team of developers passionate about building modern,
              user-friendly web applications. Let's innovate together.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Useful Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/User-Reviews"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  User Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@smarttrack.com</li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-10 flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-xl"
          >
            <BsFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-xl"
          >
            <BsTwitter />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-xl"
          >
            <BsGithub />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-xl"
          >
            <BsInstagram />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; 2025 Your Website. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default SharedFooter;
