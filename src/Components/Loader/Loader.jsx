import React from "react";
import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <CircleLoader loading={true} size={100} color="#00FFFF" />
    </div>
  );
};

export default Loader;
