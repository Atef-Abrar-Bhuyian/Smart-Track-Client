import { useQuery } from "@tanstack/react-query";
import { Avatar, Checkbox, Popover, Table } from "flowbite-react";
import React, { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import userHrInfo from "../../hooks/userHrInfo";
import { Link } from "react-router-dom";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

const AddEmployee = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const userInfo = userHrInfo();
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const { data: employees = [], refetch } = useQuery({
    queryKey: ["usersNotInTeam"],
    queryFn: async () => {
      const res = await axiosSecure.get("/usersNotInTeam");
      return res.data;
    },
  });

  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployees((prevSelected) => {
      if (prevSelected.includes(employeeId)) {
        return prevSelected.filter((id) => id !== employeeId); 
      } else {
        return [...prevSelected, employeeId]; 
      }
    });
  };

  const handleAddMultipleEmployees = () => {
    const selectedEmployeeDetails = employees.filter((employee) =>
      selectedEmployees.includes(employee._id)
    );

    const addNewEmployees = selectedEmployeeDetails.map((employee) => ({
      employee_id: employee._id,
      hrEmail: user?.email,
      employeeName: employee.name,
      employeePhoto: employee.photo,
    }));

    axiosSecure
  .post("/addMultipleEmployeeTeam", { employees: addNewEmployees, hrEmail: user?.email })
      .then((res) => {
        if (res.data.insertedIds) {
          refetch();
          Swal.fire({
            title: `Employees added to your team.`,
            background: "#003333",
            color: "#fff",
            confirmButtonColor: "#001919",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
        }
      })
      .catch((err) => {
        // console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add employees. Please try again!",
          background: "#003333",
          color: "#fff",
          confirmButtonColor: "#001919",
        });
      });
  };

  const handleAddEmployee = (id, name, img) => {
    const addNewEmpoloyee = {
      employee_id: id,
      hrEmail: user?.email,
      employeeName: name,
      employeePhoto: img,
    };
    axiosSecure
      .post("/addToTeam", addNewEmpoloyee)
      .then((res) => {
        if (res.data.insertedId) {
          refetch();
          Swal.fire({
            title: `${name} is in Your Team Now.`,
            background: "#003333",
            color: "#fff",
            confirmButtonColor: "#001919",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
        }
        return res.data;
      })
      .catch((err) => {
        if (err.response.data.message === "limit reached") {
          Swal.fire({
            icon: "error",
            title: "Limit Reached",
            text: "You’ve reached the team member limit. Please upgrade!",
            background: "#003333",
            color: "#fff",
            confirmButtonColor: "#001919",
          });
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <ReactHelmet title={"Add Employee"}></ReactHelmet>
      <div className="flex justify-between items-center my-6">
        <h1 className="text-xl font-bold">
          Total Employee: {employees?.length}
        </h1>
        <div>
          <Popover
            aria-labelledby="profile-popover"
            content={
              <div className="w-64 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h4>Selected Packge: {userInfo[0]?.selectedPackage}</h4>
                  </div>
                </div>
                <p className="mb-4 text-sm">
                  Maximum Member:{" "}
                  {userInfo[0]?.selectedPackage === "basic" ? 5 : ""}
                  {userInfo[0]?.selectedPackage === "advance" ? 10 : ""}
                  {userInfo[0]?.selectedPackage === "ultimate" ? 20 : ""}
                </p>
                <div>
                  <Link to={"/increaseLimit"}>
                    <button
                      type="button"
                      className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Increase Your Limit
                    </button>
                  </Link>
                </div>
              </div>
            }
          >
            <button className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900">
              Package Details
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
          {employees.map((employee, idx) => (
            <Table.Body key={idx} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox
                    checked={selectedEmployees.includes(employee._id)}
                    onChange={() => handleCheckboxChange(employee._id)}
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <img
                    className="w-16 h-16 rounded-full"
                    src={employee?.photo}
                  />
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
          <button onClick={handleAddMultipleEmployees}
          disabled={selectedEmployees.length === 0}
          className="disabled:bg-gray-600 disabled:cursor-not-allowed mt-4 rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900">Add Selected Employee</button>
      </div>
    </div>
  );
};

export default AddEmployee;
