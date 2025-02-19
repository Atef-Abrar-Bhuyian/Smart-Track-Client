import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Fade } from "react-awesome-reveal";

const RequestedItemsOverview = () => {
  const COLORS = ["#0088FE", "#00C49F"];
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/itemRequestStats/${user?.email}`)
      .then((res) => {
        // console.log("API Response:", res.data);
        if (res.data) {
          setItems(res.data);
        } else {
          // console.log("No data received from API");
        }
      })
      .catch((error) => {
        // console.error("Error fetching requested items data:", error.message);
      });
  }, [user, axiosSecure]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = items?.map((data) => ({
    name: data?.productType,
    value: data?.percentage,
  }));

  return (
    <div className="my-10 bg-cyan-100 p-4">
      <div className="w-11/12 mx-auto">
      <div>
        <Fade>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Requested Items Overview
        </h1>
        </Fade>
      </div>

      <div>
        {items.length > 0 ? (
          <div className="md:flex">
            <div>
              <PieChart width={400} height={400}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend></Legend>
              </PieChart>
            </div>
            <div className="flex justify-center items-center md:w-3/5 mx-auto">
              <h4 className="text-xl font-semibold text-center">
                This chart visually represents the types of products that
                employees are most requesting. It shows the proportion of
                returnable vs non-returnable items requested, helping us
                understand the demand trends and preferences of the workforce.
              </h4>
            </div>
          </div>
        ) : (
          <p className="text-center">No data available</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default RequestedItemsOverview;
