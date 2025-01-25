import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Table } from "flowbite-react";
import { format } from "date-fns";
import { GiCancel } from "react-icons/gi";

const EmployeeAssets = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: employeesAssets = [] } = useQuery({
    queryKey: ["emplyeesAsset", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employeesAssets/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="w-11/12 mx-auto my-10">
      <div>
        <h1 className="text-xl font-bold text-center my-10">My Assets</h1>
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
            {employeesAssets.map((asset, idx) =>
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
                      {request?.approvaldDate
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
                        }
                        }`}
                      >
                        {request?.status}
                      </p>
                    </Table.Cell>
                    {request?.status === "Pending" && (
                      <Table.Cell>
                        <button className="text-red-500 flex items-center gap-1">
                          Cancel <GiCancel />
                        </button>
                      </Table.Cell>
                    )}
                    {request?.status === "Approved" && (
                      <Table.Cell className="flex gap-2">
                        <button className="bg-blue-600 p-2 rounded-xl text-white">
                          Print
                        </button>
                        {request?.status === "Approved" &&
                          asset?.productType === "Returnable" && (
                            <button className="bg-blue-600 p-2 rounded-xl text-white">
                              Return
                            </button>
                          )}
                      </Table.Cell>
                    )}
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
