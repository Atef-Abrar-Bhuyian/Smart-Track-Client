import React from "react";

const HeadingWithDes = ({ heading, description }) => {
  return (
    <div className="space-y-5">
      <h1 className="text-center font-bold text-4xl md:text-5xl">{heading}</h1>
      <p className="text-center w-3/4 md:w-2/4 mx-auto text-cyan-900 text-md">{description}</p>
    </div>
  );
};

export default HeadingWithDes;
