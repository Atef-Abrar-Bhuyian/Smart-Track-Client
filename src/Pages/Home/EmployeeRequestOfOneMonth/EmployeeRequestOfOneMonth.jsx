import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import CustomBtn from "../../Shared/CustomBtn/CustomBtn";
import { format } from "date-fns";

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
        console.error("Error fetching pending requests:", error.message);
      });
  }, [user, axiosSecure]);

  return (
    <div className="w-11/12 mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl text-center font-bold my-14">
          My Monthly Requests{" "}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allRequests?.length > 0 ? (
          allRequests?.map((asset) => {
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
                        Requested Date :{" "}
                        {format(new Date(request?.requestedDate), "PPP")}
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

export default EmployeeRequestOfOneMonth;
