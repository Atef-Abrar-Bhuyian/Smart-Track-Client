import React from "react";
import HeadingWithDes from "../../Shared/HeadingWithDes/HeadingWithDes";
import { Card } from "flowbite-react";

const WhoWeAre = () => {
  return (
    <div className="mt-32 w-4/5 mx-auto">
      {/* About Section */}
      <HeadingWithDes
        heading={"Who We Are"}
        description={
          "We offer solutions that make your work easier, boost productivity, and keep things running smoothly and organized."
        }
      ></HeadingWithDes>

      {/* Grid section */}
      <div className="mt-6 lg:grid grid-cols-12 gap-6">
        {/* 1st card */}
        <div className="col-span-3 mb-6">
          <Card className="border-cyan-200 shadow-md shadow-cyan-100">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Core Values
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              We believe in Integrity, ensuring transparency; Innovation,
              adapting to your needs; Customer-Centricity, focusing on your
              success; and Excellence, delivering top-quality results.
            </p>
          </Card>
        </div>
        {/* 2nd card */}
        <div className="col-span-6 mb-6 row-span-2 ">
          <Card className="h-full border-cyan-200 shadow-md shadow-cyan-100">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Mission Statement
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Our mission is to provide innovative solutions that streamline
              asset management, ensuring your business operates efficiently and
              securely.
            </p>
          </Card>
        </div>
        {/* 3rd car */}
        <div className="col-span-3 mb-6 ">
          <Card className="border-cyan-200 shadow-md shadow-cyan-100">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Overview of Your Services
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              We offer customized asset tracking, efficient data management, and
              strong security, giving you full control and visibility over your
              assets.
            </p>
          </Card>
        </div>
        {/* 4th card */}
        <div className="col-span-3 mb-6">
          <Card className="border-cyan-200 shadow-md shadow-cyan-100">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Your Approach
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Our approach is built on simplicity and user-friendliness, making
              asset management easy to use while providing powerful features.
            </p>
          </Card>
        </div>

        {/* 5th card */}
        <div className="col-span-3 mb-6">
          <Card className="border-cyan-200 shadow-md shadow-cyan-100">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              What Sets You Apart
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              We provide real-time updates, customizable dashboards, and
              top-tier security, setting us apart from traditional systems.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
