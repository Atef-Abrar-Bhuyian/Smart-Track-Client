import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalanderSection = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="my-10 w-11/12 mx-auto">
      <div>
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-5">
          Track Your Schedule
        </h2>
      </div>
      <div className="md:flex justify-between">
        <div className="flex items-center justify-center md:w-11/12">
          <h3 className="text-2xl font-semibold text-center mb-10">
            Stay organized and manage your schedule effectively with our
            interactive calendar.
          </h3>
        </div>
        <div className="flex justify-center items-center">
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
    </div>
  );
};

export default CalanderSection;
