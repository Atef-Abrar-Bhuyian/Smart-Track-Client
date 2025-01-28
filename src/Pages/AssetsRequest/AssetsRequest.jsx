import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Button,
  FloatingLabel,
  Label,
  Modal,
  Select,
  Table,
  Textarea,
} from "flowbite-react";
import Swal from "sweetalert2";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

const AssetsRequest = () => {
  const { user, loading } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [message, setMessage] = useState("");
  const [searchItems, setSearchItems] = useState();

  const axiosSecure = useAxiosSecure();

  const { data: hrAssets = [],refetch } = useQuery({
    queryKey: ["hrAssets", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`hrAssets/${user?.email}`);
      return res.data;
    },
  });

  const handleRequest = async (id) => {
    const requestInfo = {
      userEmail: user?.email,
      userName: user?.name,
      assetsId: id,
      message: message,
      status: "Pending",
    };
    setMessage("");
    setOpenModal(false);

    const result = await axiosSecure
      .post("requestAnAsset", requestInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Request Sent to HR",
            showConfirmButton: false,
            timer: 2000,
            background: "#003333",
            color: "#fff",
          });
        }
      });
  };

  const handleSearch = (productName) => {
    const email = user?.email;
    axiosSecure
      .get(`/searchAsset/${email}?productName=${productName}`)
      .then((res) => {
        setSearchItems(res.data);
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
      <ReactHelmet title={"Asset Requests"}></ReactHelmet>
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
        {searchItems?.length > 0 ? (
          <>
            {searchItems?.length > 0 ? (
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Asset Name</Table.HeadCell>
                  <Table.HeadCell>Asset Type</Table.HeadCell>
                  <Table.HeadCell>Availability</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {searchItems.map((asset) => (
                    <Table.Row
                      key={asset._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {asset?.productName}
                      </Table.Cell>
                      <Table.Cell>{asset?.productType}</Table.Cell>
                      <Table.Cell>
                        {asset?.quantity > 0 ? (
                          <p className="p-2 bg-green-500 w-fit rounded-lg text-white">
                            Instock
                          </p>
                        ) : (
                          <p className="p-2 bg-red-500 w-fit rounded-lg text-white">
                            Stock Out
                          </p>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <button
                          disabled={asset?.quantity === 0}
                          className={`inline-flex justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 disabled:bg-gray-700 disabled:cursor-not-allowed`}
                          onClick={() => {
                            setSelectedAsset(asset);
                            setOpenModal(true);
                          }}
                        >
                          Request
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <h1 className="text-2xl font-bold text-center">
                No assets available
              </h1>
            )}
          </>
        ) : (
          <>
            {hrAssets.length > 0 ? (
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Asset Name</Table.HeadCell>
                  <Table.HeadCell>Asset Type</Table.HeadCell>
                  <Table.HeadCell>Availability</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {hrAssets.map((asset) => (
                    <Table.Row
                      key={asset._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {asset?.productName}
                      </Table.Cell>
                      <Table.Cell>{asset?.productType}</Table.Cell>
                      <Table.Cell>
                        {asset?.quantity > 0 ? (
                          <p className="p-2 bg-green-500 w-fit rounded-lg text-white">
                            Instock
                          </p>
                        ) : (
                          <p className="p-2 bg-red-500 w-fit rounded-lg text-white">
                            Stock Out
                          </p>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <button
                          disabled={asset?.quantity === 0}
                          className={`inline-flex justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 disabled:bg-gray-700 disabled:cursor-not-allowed`}
                          onClick={() => {
                            setSelectedAsset(asset);
                            setOpenModal(true);
                          }}
                        >
                          Request
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <h1 className="text-2xl font-bold text-center">
                No assets available
              </h1>
            )}
          </>
        )}
      </div>

      {selectedAsset && (
        <Modal
          dismissible
          show={openModal}
          onClose={() => {
            setOpenModal(false);
            setMessage("");
          }}
        >
          <Modal.Header>Request Asset</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p>
                You are requesting the asset:{" "}
                <span className="font-semibold">
                  {selectedAsset.productName}
                </span>
              </p>
              <form>
                <div className="mb-2 block">
                  <Label value="Your message" />
                </div>
                <Textarea
                  placeholder="Leave a message for your request..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                />
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => handleRequest(selectedAsset._id)}
              disabled={!message.trim()}
            >
              Submit Request
            </Button>
            <Button
              color="gray"
              onClick={() => {
                setOpenModal(false);
                setMessage("");
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AssetsRequest;
