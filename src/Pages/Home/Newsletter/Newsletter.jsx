import React from "react";
import { Fade } from "react-awesome-reveal";
import GradientUI from "../../../Components/GradientUI/GradientUI";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";

export default function Newsletter() {
  return (
    <section className="relative py-20 px-4 sm:px-8 md:px-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <Fade>
          <h2 className="relative text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Stay Updated!
          </h2>
          <div className="h-1.5 w-2/3 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/20"></div>
          <p className="mt-8 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Subscribe to our newsletter for the latest updates and exclusive
            offers.
          </p>
        </Fade>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 md:rounded-r-none rounded-lg w-full md:w-80 text-black outline-none mb-4 md:mb-0"
          />
          <button className="bg-cyan-600 hover:bg-cyan-800 text-white px-6 py-3 md:rounded-l-none rounded-lg font-semibold transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
