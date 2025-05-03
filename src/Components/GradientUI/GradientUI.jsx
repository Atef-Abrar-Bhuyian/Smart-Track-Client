import React from "react";

const GradientUI = () => {
  return (
    <>
      {/* Left Gradient Circle */}
      <div className="pointer-events-none absolute left-0 top-1/4 -translate-x-1/2 w-[300px] h-[300px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-3xl opacity-30 dark:opacity-20 z-0" />

      {/* Right Gradient Circle */}
      <div className="pointer-events-none absolute right-0 top-1/2 translate-x-1/2 w-[300px] h-[300px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-3xl opacity-30 dark:opacity-20 z-0" />
    </>
  );
};

export default GradientUI;
