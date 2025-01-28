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
      background: "#003333",
      color: "#fff",
      confirmButtonColor: "#001919",
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
                background: "#003333",
                color: "#fff",
                confirmButtonColor: "#001919",
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
            background: "#003333",
            color: "#fff",
            confirmButtonColor: "#001919",
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
        console.log(res.data);
        refetch();
      })
      .catch((error) => {
        console.error("Error searching assets:", error);
      });
  };


  const handleSort = async (value) => {
    if (value === "null") return;
    try {
      const response = await axiosSecure.get(`/requestAssetsFilter/${user?.email}`, {
        params: { filterType: value },
      });
  
      setSearchItems(response.data);
      console.log(response.data); 
    } catch (error) {
      console.error("Error fetching filtered assets:", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <ReactHelmet title={"Asset List"}></ReactHelmet>
      <div className="my-6">
        <h1 className="text-center font-bold text-4xl">Asset List</h1>
      </div>
      <div className="md:flex justify-between my-6">
        <div className="mb-4">
          <FloatingLabel
            onChange={(e) => handleSearch(e.target.value)}
            variant="outlined"
            label="Search By Product Name"
          />
        </div>
        <div>
          <Select
            onChange={(e) => handleSort(e.target.value)}
            defaultValue={"null"}
            required
          >
            <option value="null" disabled>
              Filter
            </option>
            <option value="available">Available</option>
            <option value="outOfStock">Out of Stock</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </Select>
        </div>
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
            {searchItems?.length > 0 ? (
              <>
                {searchItems?.map((asset) => (
                  <Table.Row
                    key={asset._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {asset?.productName}
                    </Table.Cell>
                    <Table.Cell>{asset?.productType}</Table.Cell>
                    <Table.Cell>{asset?.quantity}</Table.Cell>
                    <Table.Cell>
                      {asset?.assetAddedDate
                        ? format(new Date(asset?.assetAddedDate), "PPP")
                        : "Date not available"}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-3">
                        <button onClick={() => handleModifyAsset(asset)}>
                          <FiEdit className="text-xl text-cyan-700" />
                        </button>
                        <button onClick={() => handleDeleteAsset(asset?._id)}>
                          <RiDeleteBin6Line className="text-xl text-red-700" />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            ) : (
              <>
                {assets.map((asset) => (
                  <Table.Row
                    key={asset._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {asset?.productName}
                    </Table.Cell>
                    <Table.Cell>{asset?.productType}</Table.Cell>
                    <Table.Cell>{asset?.quantity}</Table.Cell>
                    <Table.Cell>
                      {asset?.assetAddedDate
                        ? format(new Date(asset?.assetAddedDate), "PPP")
                        : "Date not available"}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-3">
                        <button onClick={() => handleModifyAsset(asset)}>
                          <FiEdit className="text-xl text-cyan-700" />
                        </button>
                        <button onClick={() => handleDeleteAsset(asset?._id)}>
                          <RiDeleteBin6Line className="text-xl text-red-700" />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            )}
          </Table.Body>
        </Table>
      </div>

      {currentAsset && (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Modify Asset</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleUpdateAsset}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Product Name
                  </label>
                  <input
                    type="text"
                    defaultValue={currentAsset?.productName}
                    readOnly
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Product Type
                  </label>
                  <input
                    type="text"
                    defaultValue={currentAsset?.productType}
                    readOnly
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default AssetList;
