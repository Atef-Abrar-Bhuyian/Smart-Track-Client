import React, { useEffect, useState } from "react";
import AssetsListTable from "../../Components/AssetsListTable/AssetsListTable";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Table } from "flowbite-react";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/assetsList/${user?.email}`).then((res) => {
      setAssets(res.data);
    });
  }, []);
  return (
    <div className="w-11/12 md:w-4/5 mx-auto my-10">
      <ReactHelmet title={"Asset List"}></ReactHelmet>
      <div className="my-6">
        <h1 className="text-center font-bold text-4xl">Asset List</h1>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Product Type</Table.HeadCell>
          <Table.HeadCell>Product Quantity</Table.HeadCell>
          <Table.HeadCell>Date Added</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
      </Table>
      {assets.map((asset) => (
        <AssetsListTable
          key={asset._id}
          assetName={asset?.productName}
          assetType={asset?.productType}
          assetQuantity={asset?.quantity}
          assetAddedDate={asset?.assetAddedDate}
        ></AssetsListTable>
      ))}
    </div>
  );
};

export default AssetList;
