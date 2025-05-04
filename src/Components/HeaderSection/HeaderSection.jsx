import React from "react";
import { Fade } from "react-awesome-reveal";

const HeaderSection = ({ title, description }) => {
  return (
    <div className="text-center mb-16 relative">
      <div className="inline-block relative">
        <Fade>
          <h2 className="relative text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="h-1.5 w-2/3 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/20"></div>
          <p className="mt-8 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </Fade>
      </div>
    </div>
  );
};

export default HeaderSection;
