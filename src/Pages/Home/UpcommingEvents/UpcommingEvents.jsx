import { Card } from "flowbite-react";

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
    <div className="bg-gray-100 p-4 my-10">
      <div className="w-11/12 mx-auto">
      <h2 className="text-2xl md:text-4xl text-center font-bold my-10">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <Card key={index} className="max-w-sm mb-6">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Event: {event.name}
          </h5>
          <p><span className="font-bold">Event Data:</span> {event.date}</p>
          <p>{event.description}</p>
        </Card>
      ))}
      </div>
      </div>
    </div>
  );
};

export default UpcommingEvents;
