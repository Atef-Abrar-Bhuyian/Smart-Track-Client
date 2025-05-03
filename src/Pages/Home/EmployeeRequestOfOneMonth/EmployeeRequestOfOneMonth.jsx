import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import CustomBtn from "../../Shared/CustomBtn/CustomBtn";
import { format } from "date-fns";
import { Fade } from "react-awesome-reveal";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";
import GradientUI from "../../../Components/GradientUI/GradientUI";

const EmployeeRequestOfOneMonth = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [allRequests, setAllRequests] = useState([]);
  useEffect(() => {
    axiosSecure
      .get(`/allRequestsOfOneMonth/${user?.email}`)
      .then((res) => {
        setAllRequests(res.data);
      })
      .catch((error) => {
        // console.error("Error fetching pending requests:", error.message);
      });
  }, [user, axiosSecure]);

  return (
    <div className="p-4 py-10 dark:bg-gray-900 ">
      <div className="w-11/12 mx-auto">
        <HeaderSection title={"My Monthly Requests"} />

        {allRequests?.some((asset) =>
          asset?.requests?.some((r) => r.status === "Pending")
        ) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {allRequests.map((asset, i) =>
              asset?.requests?.map((request, index) =>
                request?.status === "Pending" ? (
                  <div
                    key={`${i}-${index}`}
                    className="bg-[#1e293b] border border-cyan-700 rounded-xl p-6 shadow-md"
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
                    <Link to={"/employeeAssets"}>
                      <CustomBtn text={"See Details"} />
                    </Link>
                  </div>
                ) : null
              )
            )}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-10 text-lg">
            No pending requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeeRequestOfOneMonth;
