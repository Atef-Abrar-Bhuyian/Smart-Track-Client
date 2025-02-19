import React from "react";

export default function Newsletter() {
  return (
    <div className="bg-cyan-100 text-black py-12 px-6 text-center w-full mt-12">
      <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
      <p className="mb-6 text-lg">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 md:rounded-r-none rounded-lg w-full md:w-80 text-black outline-none"
        />
        <button className=" mt-4 md:mt-0 bg-cyan-600 hover:bg-cyan-800 text-white px-6 py-3 md:rounded-l-none rounded-lg font-semibold transition">
          Subscribe
        </button>
      </div>
    </div>
  );
}
