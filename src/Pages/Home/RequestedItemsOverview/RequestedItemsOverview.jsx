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
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";
import GradientUI from "../../../Components/GradientUI/GradientUI";

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
    <div className="py-16 dark:bg-gray-900 bg-gray-100 relative overflow-hidden">
      <GradientUI />
    <div className="w-11/12 mx-auto">
      <HeaderSection title={"Requested Items Overview"} />
  
      {items.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-10 items-center mt-10">
          {/* Pie Chart */}
          <div className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-md border border-cyan-500/30">
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                wrapperStyle={{ color: 'white', fontSize: '14px' }}
                iconSize={12}
              />
            </PieChart>
          </div>
  
          {/* Description */}
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-300 leading-relaxed">
              This chart provides a visual breakdown of the most requested items
              by employees. It highlights the ratio of <span className="text-cyan-400 font-semibold">returnable</span> vs{" "}
              <span className="text-cyan-400 font-semibold">non-returnable</span> items, offering insights into employee needs and aiding in better inventory decisions.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 text-xl font-medium mt-20">
          No data available.
        </div>
      )}
    </div>
  </div>
  
  );
};

export default RequestedItemsOverview;
