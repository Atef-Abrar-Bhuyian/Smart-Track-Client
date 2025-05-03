import React from "react";
import { Fade } from "react-awesome-reveal";
import GradientUI from "../../../Components/GradientUI/GradientUI";

export default function Newsletter() {
  return (
    <section className="relative py-20 px-4 sm:px-8 md:px-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <Fade triggerOnce>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Stay Updated!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-base">
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>
          </div>
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
