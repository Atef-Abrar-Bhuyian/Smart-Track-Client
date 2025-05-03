import { Card } from "flowbite-react";
import { Fade } from "react-awesome-reveal";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";

const events = [
  {
    name: "Team Meeting",
    date: "2025-01-30",
    description: "Monthly team meeting to discuss goals.",
  },
  {
    name: "Workshop on Productivity",
    date: "2025-02-05",
    description: "Workshop to enhance personal productivity.",
  },
];

const UpcommingEvents = () => {
  return (
    <div className="py-14 px-4 dark:bg-gray-900">
    <div className="w-11/12 mx-auto max-w-7xl">
      <HeaderSection title="Upcoming Events" />
  
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-700 rounded-xl shadow-lg p-6 transition-transform hover:scale-[1.02] duration-300"
            >
              <h5 className="text-2xl font-bold text-cyan-400 mb-2">
                {event.name}
              </h5>
              <p className="text-gray-300 mb-1">
                <span className="font-semibold text-white">Date:</span>{" "}
                {event.date}
              </p>
              <p className="text-gray-400">{event.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-8">No upcoming events found.</p>
      )}
    </div>
  </div>
  
  );
};

export default UpcommingEvents;
