import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Card } from "flowbite-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import CustomBtn from "../../Shared/CustomBtn/CustomBtn";
import { Fade } from "react-awesome-reveal";

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
    <div className="w-11/12 mx-auto">
      <div className="my-10">
        <Fade>
        <h1 className="text-center text-3xl md:text-4xl font-bold">Pending Requests</h1>
        </Fade>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {pendingRequests?.length > 0 ? (
          pendingRequests?.map((asset) => {
            return asset?.requests?.map((request, index) => {
              if (request?.status === "Pending") {
                return (
                  <div key={index}>
                    <Card className="max-w-sm mb-4">
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Requested Item: {asset?.productName}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Status : {request?.status}
                      </p>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Requested Date : {format(new Date(request?.requestedDate), "PPP")}
                      </p>
                      <Link to={"/employeeAssets"}>
                        <CustomBtn text={"See Details"}></CustomBtn>
                      </Link>
                    </Card>
                    <hr />
                  </div>
                );
              }
              return null;
            });
          })
        ) : (
          <p>No pending requests found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeePendingRequests;
