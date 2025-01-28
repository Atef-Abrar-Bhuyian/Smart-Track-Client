import React from "react";
import { Fade } from "react-awesome-reveal";

const HrAnnouncements = () => {
  const announcements = [
    {
      title: "New Health Insurance Benefits!",
      description:
        "Starting from March, explore enhanced health insurance plans for you and your family.",
      date: "January 28, 2025",
    },
    {
      title: "HR Webinar on Career Development",
      description:
        "Join us on February 15th for a webinar designed to help you grow your career.",
      date: "January 20, 2025",
    },
    {
      title: "Office Wellness Program Launch",
      description:
        "Exciting wellness programs launching this quarter to promote a healthier workspace.",
      date: "January 10, 2025",
    },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
      <Fade>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Latest HR Announcements
        </h2>
      </Fade>
      <ul className="space-y-4">
        {announcements.map((announcement, index) => (
          <li
            key={index}
            className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md"
          >
            <h3 className="text-xl font-semibold">{announcement.title}</h3>
            <p className="text-gray-600 mt-2">{announcement.description}</p>
            <p className="text-sm text-gray-400 mt-1">
              Posted on: {announcement.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HrAnnouncements;
