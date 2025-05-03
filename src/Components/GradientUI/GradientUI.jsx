import React from "react";

const GradientUI = () => {
  return (
    <>
      {/* Top Gradient Circle */}
      <div className="absolute -right-96 top-20 -translate-x-1/2 w-[300px] h-[300px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-3xl opacity-30 dark:opacity-20 z-0" />

      {/* Bottom Gradient Circle */}
      <div className="absolute bottom-[-100px] top-20 -translate-x-1/2 w-[300px] h-[300px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-3xl opacity-30 dark:opacity-20 z-0" />
    </>
  );
};

export default GradientUI;
