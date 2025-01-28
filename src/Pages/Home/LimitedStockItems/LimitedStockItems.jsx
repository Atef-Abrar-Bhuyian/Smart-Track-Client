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
    <div className="w-11/12 mx-auto my-10">
      <div>
       <Fade>
       <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Limited Stock Items
        </h1>
       </Fade>
      </div>

      <div>
        {items?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {items?.map((item, idx) => (
              <Card key={idx} className="max-w-sm mb-6">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Product Name: {item?.productName}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Quantity: {item?.quantity}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Product Type: {item?.productType}
                </p>
                <Link to={"/assetList"}>
                  <CustomBtn text={"See More"}></CustomBtn>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <h1 className="text-center flex items-center justify-center font-bold text-3xl">
              All items are well-stocked.
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default LimitedStockItems;
