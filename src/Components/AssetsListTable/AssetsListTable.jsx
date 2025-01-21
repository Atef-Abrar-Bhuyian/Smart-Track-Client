import React from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";


const AssetsListTable = ({
  assetName,
  assetType,
  assetQuantity,
  assetAddedDate,
}) => {
  return (
    <div>
      <Table hoverable>
        <Table.Body>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {assetName}
            </Table.Cell>
            <Table.Cell>{assetType}</Table.Cell>
            <Table.Cell>{assetQuantity}</Table.Cell>
            <Table.Cell>{assetAddedDate}</Table.Cell>
            <Table.Cell>
              <div className="md:flex gap-2">
                <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  <p className="flex gap-1">
                    <FiEdit className="text-xl text-cyan-600" /> Update
                  </p>
                </Link>{" "}
                <p className="hidden md:block">/</p>
                <button>
                  <p className="flex gap-1 text-red-600">
                    <RiDeleteBin6Line className="text-xl " /> Delete
                  </p>
                </button>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default AssetsListTable;
