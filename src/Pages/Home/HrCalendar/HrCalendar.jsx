import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";

const HrCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="py-16 px-12 dark:bg-gray-900 bg-gray-100">
      <HeaderSection title={"Work Calendar"} />

      <div className="md:flex md:items-center md:justify-between gap-10">
        {/* Calendar Section */}
        <div className="flex justify-center items-center mb-10 md:mb-0">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-cyan-500/30 dark:bg-gray-800/40">
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>

        {/* Description Section */}
        <div className="md:w-3/5 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-300 leading-relaxed">
            Effortlessly plan, track, and coordinate all your work-related
            activities with our intuitive calendar tool. Stay ahead and never
            miss a task or deadline.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HrCalendar;
