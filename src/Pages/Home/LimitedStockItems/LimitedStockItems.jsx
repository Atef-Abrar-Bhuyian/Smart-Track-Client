import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import CustomBtn from "../../Shared/CustomBtn/CustomBtn";
import { Fade } from "react-awesome-reveal";

const LimitedStockItems = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [items, setItems] = useState();

  useEffect(() => {
    axiosSecure
      .get(`/limitedStockItems/${user?.email}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        // console.error("Error fetching pending requests:", error.message);
      });
  }, [user, axiosSecure]);

  return (
    <div className="dark:bg-gray-900 py-16">
      <div className="w-11/12 mx-auto">
        <Fade>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
            Limited Stock Items
          </h1>
        </Fade>

        {items?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <Card
                key={idx}
                className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-md border border-cyan-500/40 dark:border-cyan-500/40 text-gray-900 dark:text-white shadow-lg hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="p-6 space-y-2">
                  <h5 className="text-xl font-semibold">
                    Product:{" "}
                    <span className="text-cyan-500 ">
                      {item?.productName}
                    </span>
                  </h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    Quantity: {item?.quantity}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Type: {item?.productType}
                  </p>
                  <div className="pt-4">
                    <Link to="/assetList">
                      <CustomBtn text="See More" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 text-2xl font-medium mt-20">
            All items are well-stocked.
          </div>
        )}
      </div>
    </div>
  );
};

export default LimitedStockItems;
