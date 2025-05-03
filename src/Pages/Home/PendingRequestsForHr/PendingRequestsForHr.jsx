import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import CustomBtn from "../../Shared/CustomBtn/CustomBtn";
import { Fade } from "react-awesome-reveal";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";

const PendingRequestsForHr = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/pendingRequestsForHr/${user?.email}`)
      .then((res) => {
        setPendingRequests(res.data);
      })
      .catch((error) => {
        // console.error("Error fetching pending requests:", error.message);
      });
  }, [user, axiosSecure]);

  return (
    <div className="dark:bg-gray-900 py-16 px-4 min-h-screen">
      <div className="w-11/12 mx-auto mt-10">
        <HeaderSection title={"Pending Requests"} />

        {pendingRequests?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pendingRequests.map((request, index) => (
              <Card
                key={index}
                className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-md border border-cyan-500/30 dark:border-cyan-500/40 text-gray-900 dark:text-white shadow-lg hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="p-6 space-y-2">
                  <h5 className="text-xl font-semibold">
                    Product:{" "}
                    <span className="text-cyan-500 dark:text-cyan-400">
                      {request?.productName}
                    </span>
                  </h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    Quantity: {request?.quantity}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Type: {request?.productType}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Status: {request?.requests?.status}
                  </p>
                  <div className="pt-4">
                    <Link to="/allRequest">
                      <CustomBtn text="See Details" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 text-2xl font-medium mt-20">
            No Pending Requests Found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingRequestsForHr;
