import React from "react";
import { Table, Spinner } from "flowbite-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Swal from "sweetalert2";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import HeaderSection from "../../Components/HeaderSection/HeaderSection";
import GradientUI from "../../Components/GradientUI/GradientUI";

const AllRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: assets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myTeam"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assetsList/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

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
      background: "#0f172a", // Dark slate tone
              color: "#e0f2f1", // Soft light teal text
      confirmButtonColor: "#06b6d4", // Matching button color
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
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="py-24 dark:bg-gray-900 relative overflow-hidden min-h-screen">
      <GradientUI />
      <ReactHelmet title="All Requests" />
      <HeaderSection title="All Requests" />

      <div className="overflow-x-auto w-11/12 mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner color="info" size="xl" />
          </div>
        ) : assets.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No requests found.
          </p>
        ) : (
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Product Name</Table.HeadCell>
              <Table.HeadCell>Product Type</Table.HeadCell>
              <Table.HeadCell>Requester Email</Table.HeadCell>
              <Table.HeadCell>Requester Name</Table.HeadCell>
              <Table.HeadCell>Request Date</Table.HeadCell>
              <Table.HeadCell>Note</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {assets.map((asset) =>
                asset?.requests?.map((request, idx) => (
                  <Table.Row
                    key={idx}
                    className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-800 dark:text-white">
                      {asset?.productName}
                    </Table.Cell>
                    <Table.Cell className="text-gray-700 dark:text-gray-300">
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
                        className={`p-2 rounded-xl font-medium text-sm ${
                          request?.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-400 dark:text-white"
                            : request?.status === "Approved"
                            ? "bg-green-200 text-green-800 dark:bg-green-600 dark:text-white"
                            : "bg-red-200 text-red-800 dark:bg-red-600 dark:text-white"
                        }`}
                      >
                        {request.status}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="flex gap-2 flex-wrap">
                      {request?.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleApproveRequest(asset?._id, request?._id)
                            }
                            className="p-2 rounded-xl bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-600 dark:text-white"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleRequestReject(asset?._id, request?._id)
                            }
                            className="p-2 rounded-xl bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-600 dark:text-white"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {request?.status === "Approved" && (
                        <span className="p-2 rounded-xl bg-green-100 text-green-800 dark:bg-green-600 dark:text-white">
                          Approved
                        </span>
                      )}
                      {request?.status === "Rejected" && (
                        <span className="p-2 rounded-xl bg-red-100 text-red-800 dark:bg-red-600 dark:text-white">
                          Rejected
                        </span>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AllRequest;
