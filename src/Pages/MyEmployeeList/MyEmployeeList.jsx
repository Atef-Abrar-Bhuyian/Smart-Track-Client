import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { data } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Avatar, Checkbox, Table } from "flowbite-react";
import Swal from "sweetalert2";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

const MyEmployeeList = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: employees = [], refetch } = useQuery({
    queryKey: ["myTeam"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myTeam/${user?.email}`);
      return res.data;
    },
  });

  const allEmployeesInTeam = employees?.flatMap((team) => team.employees);

  const handleRemoveEmployee = (deleteUserId, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#001919",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#003333",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/myTeam/${user?.email}`, {
            data: { deleteUserId },
          })
          .then((res) => {
            if (res.data.modifiedCount) {
              Swal.fire({
                title: "Removed!",
                text: `${name} is Removed From Your Teams`,
                icon: "success",
                confirmButtonColor: "#001919",
                background: "#003333",
                color: "#fff",
              });
              refetch();
            }
          });
      }
    });
  };
  return (
    <div className="my-10 w-11/12 mx-auto">
      <ReactHelmet title={"My Employees"}></ReactHelmet>
      <div>
        <h1 className="text-xl font-bold text-center my-10">Team Members</h1>
        <p className="font-bold my-4">Total Members: {allEmployeesInTeam.length}</p>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4"></Table.HeadCell>
          <Table.HeadCell>Employee Image</Table.HeadCell>
          <Table.HeadCell>Employee Name</Table.HeadCell>
          <Table.HeadCell>
            <span>Remove From Your Team</span>
          </Table.HeadCell>
        </Table.Head>
        {allEmployeesInTeam.map((employee, idx) => (
          <Table.Body key={idx} className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="p-4">
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Avatar className="w-fit" img={employee?.employeePhoto} />
              </Table.Cell>
              <Table.Cell>{employee?.employeeName}</Table.Cell>
              <Table.Cell>
                <button
                  onClick={() =>
                    handleRemoveEmployee(
                      employee.employee_id,
                      employee.employeeName
                    )
                  }
                  className="inline-flex justify-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
                >
                  Remove
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
};

export default MyEmployeeList;
