import React, { useState } from "react";
import { FloatingLabel, Select, Table } from "flowbite-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Swal from "sweetalert2";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

const AllRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchItems, setSearchItems] = useState([]);

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["myTeam"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assetsList/${user?.email}`);
      return res.data;
    },
  });

  const handleSearch = (searchTerm) => {
    const email = user?.email;
    axiosSecure
      .get(`/searchRequester/${email}?searchTerm=${searchTerm}`)
      .then((res) => {
        setSearchItems(res.data);
        refetch();
      })
      .catch((error) => {
        // console.error("Error searching assets:", error);
      });
  };

  const handleApproveRequest = (assetId, requestId) => {
    axiosSecure
      .patch(`/assetRequestAccept/${user?.email}`, { assetId, requestId })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Request has been approved",
            showConfirmButton: false,
            timer: 1500,
            background: "#003333",
            color: "#fff",
          });
          refetch();
        }
      });
  };

  const handleRequestReject = (assetId, requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      background: "#003333",
      color: "#fff",
      confirmButtonColor: "#001919",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/assetRequestReject/${user?.email}`, { assetId, requestId })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Request has been rejected",
                showConfirmButton: false,
                timer: 1500,
                color: "#fff",
                background: "#003333",
                confirmButtonColor: "#001919",
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <div>
      <ReactHelmet title={"All Requests"}></ReactHelmet>
      <h1 className="text-xl font-bold my-10 text-center">All Requests</h1>

      <div className="mb-4 w-11/12 mx-auto">
        <div className="md:w-3/12">
          <FloatingLabel
            onChange={(e) => handleSearch(e.target.value)}
            variant="outlined"
            label="Search By Requester Name/Email"
          />
        </div>
      </div>

      <div className="overflow-x-auto w-11/12 mx-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Product Type</Table.HeadCell>

            <Table.HeadCell>Requested By (Email)</Table.HeadCell>
            <Table.HeadCell>Requested By (Name)</Table.HeadCell>
            <Table.HeadCell>Request Date</Table.HeadCell>
            <Table.HeadCell>Additional note</Table.HeadCell>
            <Table.HeadCell>Request Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Action</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {searchItems?.length > 0 ? (
              <>
                {searchItems?.map((asset) =>
                  asset?.requests?.map((request, idx) => (
                    <Table.Row
                      key={idx}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {asset?.productName}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {asset?.productType}
                      </Table.Cell>
                      <Table.Cell>{request?.userEmail}</Table.Cell>
                      <Table.Cell>{request?.userName}</Table.Cell>
                      <Table.Cell>
                        {format(new Date(request?.requestedDate), "PPP")}
                      </Table.Cell>
                      <Table.Cell>{request?.message}</Table.Cell>
                      <Table.Cell>
                        <span
                          className={`p-2 rounded-xl ${
                            request?.status === "Pending"
                              ? "bg-yellow-400 text-white"
                              : ""
                          } ${
                            request?.status === "Approved"
                              ? "bg-green-600 text-white"
                              : ""
                          } ${
                            request?.status === "Rejected"
                              ? "bg-red-600 text-white"
                              : ""
                          } ${
                            request?.status === "Returned"
                              ? "bg-blue-600 text-white"
                              : ""
                          }`}
                        >
                          {request.status}
                        </span>
                      </Table.Cell>

                      {request?.status === "Pending" && (
                        <Table.Cell className="flex gap-2">
                          <button
                            onClick={() =>
                              handleApproveRequest(asset?._id, request?._id)
                            }
                            className="p-2 rounded-xl bg-green-600 text-white"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleRequestReject(asset?._id, request?._id)
                            }
                            className="p-2 rounded-xl bg-red-600 text-white"
                          >
                            Reject
                          </button>
                        </Table.Cell>
                      )}
                      {request?.status === "Approved" && (
                        <Table.Cell className="flex gap-2">
                          <button className="p-2 rounded-xl bg-green-600 text-white">
                            Approved
                          </button>
                        </Table.Cell>
                      )}
                      {request?.status === "Rejected" && (
                        <Table.Cell className="flex gap-2">
                          <button className="p-2 rounded-xl bg-red-600 text-white">
                            Rejected
                          </button>
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))
                )}
              </>
            ) : (
              <>
                {assets?.map((asset) =>
                  asset?.requests?.map((request, idx) => (
                    <Table.Row
                      key={idx}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {asset?.productName}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {asset?.productType}
                      </Table.Cell>
                      <Table.Cell>{request?.userEmail}</Table.Cell>
                      <Table.Cell>{request?.userName}</Table.Cell>
                      <Table.Cell>
                        {format(new Date(request?.requestedDate), "PPP")}
                      </Table.Cell>
                      <Table.Cell>{request?.message}</Table.Cell>
                      <Table.Cell>
                        <span
                          className={`p-2 rounded-xl ${
                            request?.status === "Pending"
                              ? "bg-yellow-400 text-white"
                              : ""
                          } ${
                            request?.status === "Approved"
                              ? "bg-green-600 text-white"
                              : ""
                          } ${
                            request?.status === "Rejected"
                              ? "bg-red-600 text-white"
                              : ""
                          } ${
                            request?.status === "Returned"
                              ? "bg-blue-600 text-white"
                              : ""
                          }`}
                        >
                          {request.status}
                        </span>
                      </Table.Cell>

                      {request?.status === "Pending" && (
                        <Table.Cell className="flex gap-2">
                          <button
                            onClick={() =>
                              handleApproveRequest(asset?._id, request?._id)
                            }
                            className="p-2 rounded-xl bg-green-600 text-white"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleRequestReject(asset?._id, request?._id)
                            }
                            className="p-2 rounded-xl bg-red-600 text-white"
                          >
                            Reject
                          </button>
                        </Table.Cell>
                      )}
                      {request?.status === "Approved" && (
                        <Table.Cell className="flex gap-2">
                          <button className="p-2 rounded-xl bg-green-600 text-white">
                            Approved
                          </button>
                        </Table.Cell>
                      )}
                      {request?.status === "Rejected" && (
                        <Table.Cell className="flex gap-2">
                          <button className="p-2 rounded-xl bg-red-600 text-white">
                            Rejected
                          </button>
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))
                )}
              </>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default AllRequest;
