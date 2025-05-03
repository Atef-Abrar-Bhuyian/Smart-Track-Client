import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Card } from "flowbite-react";
import { Fade } from "react-awesome-reveal";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";
import GradientUI from "../../../Components/GradientUI/GradientUI";

const TopRequestedItems = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [items, setItems] = useState();

  useEffect(() => {
    axiosSecure
      .get(`/topRequestedItems/${user?.email}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        // console.error("Error fetching pending requests:", error.message);
      });
  }, [user, axiosSecure]);

  return (
    <div className="dark:bg-gray-900 py-16 px-4 relative overflow-hidden">
      <GradientUI />
    <div className="w-11/12 mx-auto">
      <HeaderSection title={"Top Most Requested Items"} />
  
      {items?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <Card
              key={idx}
              className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-md border border-cyan-500/30 dark:border-cyan-500/40 text-gray-900 dark:text-white shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="p-6 space-y-2">
                <h5 className="text-xl font-semibold">
                  Product:{" "}
                  <span className="text-cyan-500 dark:text-cyan-400">
                    {item?._id}
                  </span>
                </h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Total Requests: {item?.totalRequests}
                </p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 text-2xl font-medium mt-20">
          No One Requested Yet.
        </div>
      )}
    </div>
  </div>
  
  );
};

export default TopRequestedItems;
