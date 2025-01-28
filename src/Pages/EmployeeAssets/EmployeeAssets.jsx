import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FloatingLabel, Table } from "flowbite-react";
import { format } from "date-fns";
import { GiCancel } from "react-icons/gi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "../../Components/PdfDocument/PdfDocument";
import Swal from "sweetalert2";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

const EmployeeAssets = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [serachItems, setSearchItems] = useState([]);

  const { data: employeesAssets = [], refetch } = useQuery({
    queryKey: ["emplyeesAsset", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employeesAssets/${user?.email}`);
      return res.data;
    },
  });

  const handleSearch = (productName) => {
    const email = user?.email;
    axiosSecure
      .get(`/searchAsset/${email}?productName=${productName}`)
      .then((res) => {
        // console.log("Assets found:", res.data);
        setSearchItems(res.data);
        refetch();
      })
      .catch((error) => {
        // console.error("Error searching assets:", error);
      });
  };

  const handleCancelRequest = (assetId, requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#003333",
      color: "#fff",
      confirmButtonColor: "#001919",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/deleteRequest`, {
            data: { assetId, requestId },
          })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Your request has been successfully deleted.",
                icon: "success",
                background: "#003333",
                color: "#fff",
                confirmButtonColor: "#001919",
              });
              refetch();
            }
          })
          .catch((err) => {
            // console.error(err);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the request. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleReturn = (assetId, requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to return this asset?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, return it!",
      background: "#003333",
      color: "#fff",
      confirmButtonColor: "#001919",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch("/returnAsset", { assetId, requestId })
          .then((res) => {
            if (res.data.modifiedCount) {
              Swal.fire({
                title: "Returned!",
                text: "Your asset has been successfully returned.",
                icon: "success",
                background: "#003333",
                color: "#fff",
                confirmButtonColor: "#001919",
              });
              refetch();
            }
          })
          .catch((err) => {
            // console.error(err);
            Swal.fire({
              title: "Error!",
              text: "Failed to return the asset. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <ReactHelmet title={"My Assets"}></ReactHelmet>
      <div>
        <h1 className="text-xl font-bold text-center my-10">
          My Requested Assets
        </h1>
      </div>

      <div className="md:flex justify-between my-6">
        <div className="mb-4">
          <FloatingLabel
            onChange={(e) => handleSearch(e.target.value)}
            variant="outlined"
            label="Search By Prouct Name"
          />
        </div>
        <div>Filter</div>
      </div>

      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Asset Name</Table.HeadCell>
            <Table.HeadCell>Asset Type</Table.HeadCell>
            <Table.HeadCell>Request Date</Table.HeadCell>
            <Table.HeadCell>Approval Date</Table.HeadCell>
            <Table.HeadCell>Request Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {serachItems?.length > 0 ? (
              <>
                {serachItems.map((asset) =>
                  asset?.requests
                    .filter((request) => request?.userEmail === user?.email)
                    .map((request, idx) => (
                      <Table.Row
                        key={idx}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {asset?.productName}
                        </Table.Cell>
                        <Table.Cell>{asset?.productType}</Table.Cell>
                        <Table.Cell>
                          {format(new Date(request?.requestedDate), "PPP")}
                        </Table.Cell>
                        <Table.Cell>
                          {request?.status === "Returned"
                            ? ""
                            : request?.approvaldDate
                            ? format(new Date(request?.approvaldDate), "PPP")
                            : "Not Approved Yet"}
                        </Table.Cell>
                        <Table.Cell>
                          <p
                            className={`${
                              request?.status === "Pending"
                                ? "bg-yellow-400 text-black p-2 w-fit rounded-xl"
                                : ""
                            } ${
                              request?.status === "Approved"
                                ? "bg-green-600 text-white p-2 w-fit rounded-xl"
                                : ""
                            } ${
                              request?.status === "Rejected"
                                ? "bg-red-600 text-white p-2 w-fit rounded-xl"
                                : ""
                            }`}
                          >
                            {request?.status}
                          </p>
                        </Table.Cell>
                        {request?.status === "Pending" && (
                          <Table.Cell>
                            <button
                              onClick={() =>
                                handleCancelRequest(asset?._id, request?._id)
                              }
                              className="text-white flex items-center gap-1 p-2 rounded-xl bg-red-600"
                            >
                              Cancel <GiCancel />
                            </button>
                          </Table.Cell>
                        )}
                        {request?.status === "Approved" && (
                          <Table.Cell className="flex gap-2">
                            <PDFDownloadLink
                              document={
                                <PdfDocument
                                  companyName={asset?.companyName}
                                  hrEmail={asset?.hrEmail}
                                  productName={asset?.productName}
                                  productType={asset?.productType}
                                  requestDate={request?.requestedDate}
                                  approvalDate={request?.approvaldDate}
                                />
                              }
                              fileName="Asset's Information.pdf"
                              className="bg-blue-600 p-2 rounded-xl text-white"
                            >
                              Print
                            </PDFDownloadLink>
                            {request?.status === "Approved" &&
                              asset?.productType === "Returnable" && (
                                <button
                                  onClick={() =>
                                    handleReturn(asset._id, request._id)
                                  }
                                  disabled={request?.status === "Returned"}
                                  className={`${
                                    request?.status === "Returned"
                                      ? "bg-gray-400"
                                      : "bg-blue-600"
                                  } p-2 rounded-xl text-white`}
                                >
                                  {request?.status === "Returned"
                                    ? "Returned"
                                    : "Return"}
                                </button>
                              )}
                          </Table.Cell>
                        )}
                      </Table.Row>
                    ))
                )}
              </>
            ) : (
              <>
                {employeesAssets.map((asset) =>
                  asset?.requests
                    .filter((request) => request?.userEmail === user?.email)
                    .map((request, idx) => (
                      <Table.Row
                        key={idx}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {asset?.productName}
                        </Table.Cell>
                        <Table.Cell>{asset?.productType}</Table.Cell>
                        <Table.Cell>
                          {format(new Date(request?.requestedDate), "PPP")}
                        </Table.Cell>
                        <Table.Cell>
                          {request?.status === "Returned"
                            ? ""
                            : request?.approvaldDate
                            ? format(new Date(request?.approvaldDate), "PPP")
                            : "Not Approved Yet"}
                        </Table.Cell>
                        <Table.Cell>
                          <p
                            className={`${
                              request?.status === "Pending"
                                ? "bg-yellow-400 text-black p-2 w-fit rounded-xl"
                                : ""
                            } ${
                              request?.status === "Approved"
                                ? "bg-green-600 text-white p-2 w-fit rounded-xl"
                                : ""
                            } ${
                              request?.status === "Rejected"
                                ? "bg-red-600 text-white p-2 w-fit rounded-xl"
                                : ""
                            }`}
                          >
                            {request?.status}
                          </p>
                        </Table.Cell>
                        {request?.status === "Pending" && (
                          <Table.Cell>
                            <button
                              onClick={() =>
                                handleCancelRequest(asset?._id, request?._id)
                              }
                              className="text-white flex items-center gap-1 p-2 rounded-xl bg-red-600"
                            >
                              Cancel <GiCancel />
                            </button>
                          </Table.Cell>
                        )}
                        {request?.status === "Approved" && (
                          <Table.Cell className="flex gap-2">
                            <PDFDownloadLink
                              document={
                                <PdfDocument
                                  companyName={asset?.companyName}
                                  hrEmail={asset?.hrEmail}
                                  productName={asset?.productName}
                                  productType={asset?.productType}
                                  requestDate={request?.requestedDate}
                                  approvalDate={request?.approvaldDate}
                                />
                              }
                              fileName="Asset's Information.pdf"
                              className="bg-blue-600 p-2 rounded-xl text-white"
                            >
                              Print
                            </PDFDownloadLink>
                            {request?.status === "Approved" &&
                              asset?.productType === "Returnable" && (
                                <button
                                  onClick={() =>
                                    handleReturn(asset._id, request._id)
                                  }
                                  disabled={request?.status === "Returned"}
                                  className={`${
                                    request?.status === "Returned"
                                      ? "bg-gray-400"
                                      : "bg-blue-600"
                                  } p-2 rounded-xl text-white`}
                                >
                                  {request?.status === "Returned"
                                    ? "Returned"
                                    : "Return"}
                                </button>
                              )}
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

export default EmployeeAssets;
