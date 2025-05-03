import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Card } from "flowbite-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import CustomBtn from "../../Shared/CustomBtn/CustomBtn";
import { Fade } from "react-awesome-reveal";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";

const EmployeePendingRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/pendingRequests/${user?.email}`)
      .then((res) => {
        setPendingRequests(res.data);
      })
      .catch((error) => {
        // console.error("Error fetching pending requests:", error.message);
      });
  }, [user, axiosSecure]);

  return (
    <div className="py-20 px-10 dark:bg-gray-900 ">
      <div className="my-10">
        <HeaderSection title={"Pending Requests"} />
      </div>

      {pendingRequests?.some((asset) =>
        asset?.requests?.some((r) => r.status === "Pending")
      ) ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Fade>
            {pendingRequests.map((asset, i) =>
              asset?.requests?.map((request, index) =>
                request?.status === "Pending" ? (
                  <div
                    key={`${i}-${index}`}
                    className="bg-gray-900 border border-cyan-600 rounded-xl p-6 shadow-xl backdrop-blur-md"
                  >
                    <h5 className="text-xl font-semibold text-cyan-400 mb-2">
                      Requested Item:{" "}
                      <span className="text-white">{asset?.productName}</span>
                    </h5>
                    <p className="text-sm text-gray-300 mb-1">
                      <span className="font-medium text-white">Status:</span>{" "}
                      {request?.status}
                    </p>
                    <p className="text-sm text-gray-300 mb-4">
                      <span className="font-medium text-white">
                        Requested Date:
                      </span>{" "}
                      {format(new Date(request?.requestedDate), "PPP")}
                    </p>
                    <Link to="/employeeAssets">
                      <CustomBtn text="See Details" />
                    </Link>
                  </div>
                ) : null
              )
            )}
          </Fade>
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg py-10">
          No pending requests found.
        </div>
      )}
    </div>
  );
};

export default EmployeePendingRequests;
