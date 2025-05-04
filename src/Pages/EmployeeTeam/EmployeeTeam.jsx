import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import HeaderSection from "../../Components/HeaderSection/HeaderSection";

const EmployeeTeam = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: employees = [] } = useQuery({
    queryKey: ["emplyeeTeam", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/emplyeeTeam/${user?.email}`);
      return res?.data;
    },
  });

  return (
    <div className="py-16 mt-10 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <ReactHelmet title="My Team" />

      <div className="w-11/12 mx-auto">
        {employees.length === 0 ? (
          <HeaderSection title="No Team Member Found" />
        ) : (
          <>
            <div className="mb-12 text-center">
              <HeaderSection
                title="Meet My Team"
                description="Here’s a list of team members assigned to you."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {employees?.team?.employees.map((team) => (
                <div
                  key={team?.employee_id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex justify-center mb-4">
                    <img
                      src={team?.employeePhoto}
                      alt={team?.employeeName}
                      className="w-24 h-24 object-cover rounded-full border-4 border-indigo-500"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {team?.employeeName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      Team Member
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeTeam;
