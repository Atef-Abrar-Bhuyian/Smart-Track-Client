import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Button, FloatingLabel, Modal, Select, Table } from "flowbite-react";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";
import HeaderSection from "../../Components/HeaderSection/HeaderSection";
import GradientUI from "../../Components/GradientUI/GradientUI";

const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [searchItems, setSearchItems] = useState();

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["myTeam"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assetsList/${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteAsset = (id) => {
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
          .delete(`/assetsList/${user?.email}`, { data: { id } })
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Asset has been deleted.",
                icon: "success",
                background: "#0f172a", // Dark slate tone
                color: "#e0f2f1", // Soft light teal text
                confirmButtonColor: "#06b6d4", // Matching button color
              });
              refetch();
            }
          });
      }
    });
  };

  const handleModifyAsset = (asset) => {
    setCurrentAsset(asset);
    setOpenModal(true);
  };

  const handleUpdateAsset = (e) => {
    e.preventDefault();
    const updatedData = {
      quantity: currentAsset.quantity,
      hrEmail: user?.email,
    };

    axiosSecure
      .patch(`/assetsList/${currentAsset._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Updated!",
            text: "Asset quantity has been updated successfully.",
            icon: "success",
            background: "#0f172a", // Dark slate tone
            color: "#e0f2f1", // Soft light teal text
            confirmButtonColor: "#06b6d4", // Matching button color
          });
          refetch();
          setOpenModal(false);
        }
      });
  };

  const handleSearch = (productName) => {
    const email = user?.email;
    axiosSecure
      .get(`/searchAssetHr/${email}?productName=${productName}`)
      .then((res) => {
        setSearchItems(res.data);
        refetch();
      })
      .catch((error) => {
        // console.error("Error searching assets:", error);
      });
  };

  //
  const handleFilter = async (value) => {
    if (value === "null") return;
    try {
      const response = await axiosSecure.get(
        `/requestAssetsFilterHr/${user?.email}`,
        {
          params: { filterType: value },
        }
      );

      setSearchItems(response.data);
    } catch (error) {
      // console.error("Error fetching filtered assets:", error);
    }
  };

  // Sort Item By Quantity
  const handleSort = async (sortOrder) => {
    try {
      const response = await axiosSecure.get(`/assetListSort/${user?.email}`, {
        params: { filterType: sortOrder }, // Ensure parameter name matches backend
      });

      setSearchItems(response.data);
    } catch (error) {
      console.error("Error fetching sorted assets:", error);
    }
  };

  return (
    <div className="pt-24 py-12 dark:bg-gray-900 relative overflow-hidden">
      <GradientUI />
      <ReactHelmet title={"Asset List"} />
      <Fade>
        <div className="mb-8">
          <HeaderSection title={"Asset List"} />
        </div>
      </Fade>

      {/* Filters & Search */}
      <div className="md:flex justify-between items-center mb-8 gap-4 w-11/12 mx-auto">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search By Product Name"
            className="w-full px-4 py-2 border border-cyan-300 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition duration-200 bg-transparent"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select
            onChange={(e) => handleFilter(e.target.value)}
            defaultValue={"null"}
            className="w-full md:w-48"
          >
            <option value="null" disabled>
              Filter
            </option>
            <option value="available">Available</option>
            <option value="outOfStock">Out of Stock</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </Select>
          <Select
            onChange={(e) => handleSort(e.target.value)}
            defaultValue={"null"}
            className="w-full md:w-48"
          >
            <option value="null" disabled>
              Sort By Quantity
            </option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-md w-11/12 mx-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Product Type</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Date Added</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {(searchItems?.length > 0 ? searchItems : assets).map((asset) => (
              <Table.Row
                key={asset._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {asset.productName}
                </Table.Cell>
                <Table.Cell className="text-gray-700 dark:text-gray-300">
                  {asset.productType}
                </Table.Cell>
                <Table.Cell className="text-gray-700 dark:text-gray-300">
                  {asset.quantity}
                </Table.Cell>
                <Table.Cell className="text-gray-700 dark:text-gray-300">
                  {asset.assetAddedDate
                    ? format(new Date(asset.assetAddedDate), "PPP")
                    : "Date not available"}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleModifyAsset(asset)}
                      title="Edit"
                    >
                      <FiEdit className="text-xl text-cyan-600 hover:text-cyan-400 transition-colors" />
                    </button>
                    <button
                      onClick={() => handleDeleteAsset(asset._id)}
                      title="Delete"
                    >
                      <RiDeleteBin6Line className="text-xl text-red-600 hover:text-red-400 transition-colors" />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Edit Modal */}
      {currentAsset && (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Modify Asset</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleUpdateAsset}>
              <div className="space-y-5">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Product Name
                  </label>
                  <input
                    type="text"
                    readOnly
                    defaultValue={currentAsset.productName}
                    className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Product Type
                  </label>
                  <input
                    type="text"
                    readOnly
                    defaultValue={currentAsset.productType}
                    className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={currentAsset.quantity}
                    onChange={(e) =>
                      setCurrentAsset({
                        ...currentAsset,
                        quantity: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
                  />
                </div>
                <div className="text-right">
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default AssetList;
