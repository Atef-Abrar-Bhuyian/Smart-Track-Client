import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";

const EmployeeTeam = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: employees = [] } = useQuery({
    queryKey: ["emplyeeTeam", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/emplyeeTeam/${user?.email}`);
      return res.data;
    },
  });
  console.log(employees);
  
  return (
    <div className="md:w-6/12 mx-auto my-10">
      <div className="my-10">
        <h1 className="text-2xl text-center font-bold">My Team Members</h1>
      </div>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Employee Name</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {employees?.team?.employees.map((team) => (
            <Table.Row
              key={team?.employee_id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {team?.employeeName}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <img
                  className="w-20 h-20 border-none rounded-full"
                  src={team?.employeePhoto}
                  alt={`${team?.employeeName}'s Photo`}
                />{" "}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default EmployeeTeam;
