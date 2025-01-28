import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const HrCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="my-10 w-11/12 mx-auto">
      <div>
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-5">
        Work Calendar
        </h2>
      </div>

      <div className="md:flex justify-between">
        <div className="flex justify-center items-center">
          <Calendar onChange={setDate} value={date} />
        </div>
        <div className="flex items-center justify-center md:w-11/12">
          <h3 className="text-2xl font-semibold text-center mb-10 md:w-4/5 mx-auto">
            Effortlessly plan, track, and coordinate all activities with
            intuitive calendar tool.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HrCalendar;
