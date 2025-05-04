import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FloatingLabel, Select, Table } from "flowbite-react";
import { format } from "date-fns";
import { GiCancel } from "react-icons/gi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "../../Components/PdfDocument/PdfDocument";
import Swal from "sweetalert2";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import { Fade } from "react-awesome-reveal";
import HeaderSection from "../../Components/HeaderSection/HeaderSection";
import GradientUI from "../../Components/GradientUI/GradientUI";

const EmployeeAssets = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchItems, setSearchItems] = useState([]);

  const { data: employeesAssets = [], refetch } = useQuery({
    queryKey: ["employeesAsset", user?.email],
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
        setSearchItems(res.data);
        refetch();
      })
      .catch((error) => {
        // console.error("Error searching assets:", error);
      });
  };

  const handleSort = async (value) => {
    if (value === "null") return;
    try {
      const response = await axiosSecure.get(
        `/assetsRequestFilter/${user?.email}`,
        {
          params: { filterType: value },
        }
      );

      setSearchItems(response.data);
      // console.log(response.data);
    } catch (error) {
      // console.error("Error fetching filtered assets:", error);
    }
  };

  const handleCancelRequest = (assetId, requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a", // Dark slate tone
              color: "#e0f2f1", // Soft light teal text
      confirmButtonColor: "#06b6d4", // Matching button color
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
                background: "#0f172a", // Dark slate tone
                color: "#e0f2f1", // Soft light teal text
                confirmButtonColor: "#06b6d4", // Matching button color
              });
              refetch();
            }
          })
          .catch((err) => {
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
      background: "#0f172a", // Dark slate tone
      color: "#e0f2f1", // Soft light teal text
      confirmButtonColor: "#06b6d4", // Matching button color
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
                background: "#0f172a", // Dark slate tone
              color: "#e0f2f1", // Soft light teal text
                confirmButtonColor: "#06b6d4", // Matching button color
              });
              refetch();
            }
          })
          .catch((err) => {
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
    <div className="py-16 px-4 md:px-8 dark:bg-gray-900 min-h-screen relative overflow-hidden">
      <ReactHelmet title="My Assets" />
      <GradientUI />

      {/* Page Header */}
      <div className="text-center mb-10 mt-10">
        <HeaderSection title="My Requested Assets" />
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Redesigned Search Input */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by Product Name"
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>

        {/* Sort Dropdown */}
        <Select
          onChange={(e) => handleSort(e.target.value)}
          defaultValue="null"
          className="w-full md:w-1/3"
          required
        >
          <option value="null" disabled>
            Filter by Status
          </option>
          <option value="Pending">Pending Requests</option>
          <option value="Approved">Approved Requests</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-Returnable">Non-Returnable</option>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md dark:shadow-none">
        <Table hoverable className="text-sm">
          <Table.Head className="bg-gray-100 dark:bg-gray-700">
            <Table.HeadCell>Asset Name</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Requested</Table.HeadCell>
            <Table.HeadCell>Approved</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell className="text-center">Action</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {(searchItems?.length ? searchItems : employeesAssets)?.map(
              (asset) =>
                asset?.requests
                  .filter((req) => req?.userEmail === user?.email)
                  .map((req, idx) => (
                    <Table.Row key={idx} className="bg-white dark:bg-gray-800">
                      <Table.Cell className="font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {asset?.productName}
                      </Table.Cell>
                      <Table.Cell>{asset?.productType}</Table.Cell>
                      <Table.Cell>
                        {format(new Date(req?.requestedDate), "PPP")}
                      </Table.Cell>
                      <Table.Cell>
                        {req?.status === "Returned"
                          ? "-"
                          : req?.approvaldDate
                          ? format(new Date(req?.approvaldDate), "PPP")
                          : "Not Approved"}
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                            req?.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : req?.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : req?.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : req?.status === "Returned"
                              ? "bg-gray-200 text-gray-700"
                              : ""
                          }`}
                        >
                          {req?.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-col md:flex-row gap-2 justify-center">
                          {req?.status === "Pending" && (
                            <button
                              onClick={() =>
                                handleCancelRequest(asset?._id, req?._id)
                              }
                              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
                            >
                              Cancel <GiCancel />
                            </button>
                          )}

                          {req?.status === "Approved" && (
                            <>
                              <PDFDownloadLink
                                document={
                                  <PdfDocument
                                    companyName={asset?.companyName}
                                    hrEmail={asset?.hrEmail}
                                    productName={asset?.productName}
                                    productType={asset?.productType}
                                    requestDate={req?.requestedDate}
                                    approvalDate={req?.approvaldDate}
                                  />
                                }
                                fileName="Asset_Information.pdf"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition"
                              >
                                Print
                              </PDFDownloadLink>

                              {asset?.productType === "Returnable" && (
                                <button
                                  onClick={() =>
                                    handleReturn(asset._id, req._id)
                                  }
                                  disabled={req?.status === "Returned"}
                                  className={`px-3 py-1 rounded-lg text-white ${
                                    req?.status === "Returned"
                                      ? "bg-gray-400 cursor-not-allowed"
                                      : "bg-indigo-600 hover:bg-indigo-700"
                                  }`}
                                >
                                  {req?.status === "Returned"
                                    ? "Returned"
                                    : "Return"}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeAssets;
