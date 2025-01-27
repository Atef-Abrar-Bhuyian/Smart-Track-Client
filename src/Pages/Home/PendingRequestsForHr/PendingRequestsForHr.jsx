import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import CustomBtn from "../../Shared/CustomBtn/CustomBtn";

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
        console.error("Error fetching pending requests:", error.message);
      });
  }, [user, axiosSecure]);

  return (
    <div className="w-11/12 mx-auto my-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Pending Requests
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingRequests.length > 0 ? (
          <>
            {pendingRequests?.map((request, index) => (
              <Card key={index} className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Product Name: {request?.productName}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Quantity: {request?.quantity}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Type: {request?.productType}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Status: {request?.requests?.status}
                </p>
                <Link to={"/allRequest"}>
                  <CustomBtn text={"See Details"}></CustomBtn>
                </Link>
              </Card>
            ))}
          </>
        ) : (
          <>
            {" "}
            <h1 className="text-center flex items-center justify-center font-bold text-3xl">
              No Request Available
            </h1>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default PendingRequestsForHr;
