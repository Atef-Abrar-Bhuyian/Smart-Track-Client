import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Table } from "flowbite-react";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["myTeam"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assetsList/${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteAsset = (id, name) => {
    axiosSecure
      .delete(`/assetsList/${user?.email}`, {
        data: { id },
      })
      .then((res) => {
        if (res.data.deletedCount) {
          Swal.fire(`${name} is Removed From Your Asset`);
          refetch();
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <ReactHelmet title={"Asset List"}></ReactHelmet>
      <div className="my-6">
        <h1 className="text-center font-bold text-4xl">Asset List</h1>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Product Type</Table.HeadCell>
            <Table.HeadCell>Product Quantity</Table.HeadCell>
            <Table.HeadCell>Date Added</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {assets.map((asset) => (
              <Table.Row
                key={asset._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {asset?.productName}
                </Table.Cell>
                <Table.Cell className="overflow-hidden">
                  {asset?.productType}
                </Table.Cell>
                <Table.Cell>{asset?.quantity}</Table.Cell>
                <Table.Cell>
                  {asset?.assetAddedDate
                    ? format(new Date(asset?.assetAddedDate), "PPP")
                    : "Date not available"}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-3">
                    <button>
                      <FiEdit className="text-xl text-cyan-700" />
                    </button>
                    <button onClick={() => handleDeleteAsset(asset?._id)}>
                      <RiDeleteBin6Line className="text-xl text-red-700" />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default AssetList;
