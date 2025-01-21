import { useQuery } from "@tanstack/react-query";
import { Avatar, Checkbox, Popover, Table } from "flowbite-react";
import React, { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const AddEmployee = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: employees = [], refetch } = useQuery({
    queryKey: ["usersNotInTeam"],
    queryFn: async () => {
      const res = await axiosSecure.get("/usersNotInTeam");
      return res.data;
    },
  });

  const handleAddEmployee = (id, name, img) => {
    const addNewEmpoloyee = {
      employee_id: id,
      hrEmail: user?.email,
      employeeName: name,
      employeePhoto: img,
    };
    axiosSecure.post("/addToTeam", addNewEmpoloyee).then((res) => {
      if (res.data.insertedId) {
        refetch();
        Swal.fire(`${name} is in Your Team Now.`);
      }
      return res.data;
    });
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="flex justify-between">
        <h1>Total Employee: {employees?.length}</h1>
        <div>
          <Popover
            aria-labelledby="profile-popover"
            content={
              <div className="w-64 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h4>Selected Packge</h4>
                  </div>
                </div>
                <p className="mb-4 text-sm">Maximum Number</p>
                <div>
                  <button
                    type="button"
                    className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Increase Your Limit
                  </button>
                </div>
              </div>
            }
          >
            <button className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900">
              Your Package
            </button>
          </Popover>
        </div>
      </div>

      <div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4"></Table.HeadCell>
            <Table.HeadCell>Employee Image</Table.HeadCell>
            <Table.HeadCell>Employee Name</Table.HeadCell>
            <Table.HeadCell>
              <span>Add Your Team</span>
            </Table.HeadCell>
          </Table.Head>
          {employees.map((employee) => (
            <Table.Body key={employee._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <Avatar className="w-fit" img={employee?.photo} />
                </Table.Cell>
                <Table.Cell>{employee?.name}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() =>
                      handleAddEmployee(
                        employee?._id,
                        employee?.name,
                        employee?.photo
                      )
                    }
                    className="inline-flex justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
                  >
                    Add
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default AddEmployee;
