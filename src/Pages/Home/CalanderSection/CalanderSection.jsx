import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import GradientUI from "../../../Components/GradientUI/GradientUI";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";

const CalanderSection = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="py-14 px-4 dark:bg-gray-900 relative overflow-hidden">
      <GradientUI />
      <div className="max-w-6xl mx-auto">
        <HeaderSection
          title={"Track Your Schedule"}
          description={
            "Stay on top of your tasks with our sleek interactive calendar. Plan efficiently and never miss a deadline."
          }
        />

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl text-gray-700 font-bold mb-4 dark:text-cyan-500">
              Organize your time effectively
            </h3>
            <p className="text-gray-400">
              Keep everything in one place, streamline your work week, and
              visualize your upcoming requests or tasks with ease. Our built-in
              calendar ensures better time management and improved productivity.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center items-center bg-gray-800 p-6 rounded-2xl shadow-lg border border-cyan-800">
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalanderSection;
