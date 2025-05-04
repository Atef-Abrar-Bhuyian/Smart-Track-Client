import React from "react";
import { Fade } from "react-awesome-reveal";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";
import GradientUI from "../../../Components/GradientUI/GradientUI";

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
    <div className="py-6 shadow-md dark:bg-gray-900 py-12 relative overflow-hidden">
      <GradientUI />
      <HeaderSection title={"Latest HR Announcements"} />
      <div className="w-11/12 mx-auto">
        {announcements?.length > 0 ? (
          <ul className="space-y-5">
            {announcements.map((announcement, index) => (
              <li
                key={index}
                className="p-5 rounded-xl bg-white/10 backdrop-blur-lg border border-cyan-500/20 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800/50"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {announcement.title}
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {announcement.description}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Posted on: {announcement.date}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No announcements at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default HrAnnouncements;
