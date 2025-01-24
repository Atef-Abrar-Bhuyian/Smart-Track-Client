import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Table } from "flowbite-react";

const AssetsRequest = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requestAssets = [] } = useQuery({
    queryKey: ["requestAssets", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`requestAssets/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="overflow-x-auto">
        {requestAssets.length > 0 ? (
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Asset Name</Table.HeadCell>
              <Table.HeadCell>Asset Type</Table.HeadCell>
              <Table.HeadCell>Availability </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {requestAssets.map((asset) => (
                <Table.Row
                  key={asset._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {asset?.productName}
                  </Table.Cell>
                  <Table.Cell>{asset?.productType}</Table.Cell>
                  {/* <Table.Cell>{`${asset?.quantity > 0} ? `}</Table.Cell> */}
                  <Table.Cell>
                    {asset?.quantity > 0 ? (
                      <p className="text-green-500">Instock</p>
                    ) : (
                      <p className="text-red-500">Stock Out</p>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <button className="inline-flex justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 ">
                      Request
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <h1 className="text-2xl font-bold text-center">
            No assets available.
          </h1>
        )}
      </div>
    </div>
  );
};

export default AssetsRequest;
