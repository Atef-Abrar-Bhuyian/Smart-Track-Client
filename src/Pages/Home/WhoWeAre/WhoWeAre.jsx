import React from "react";
import { FaBullseye, FaChartBar, FaUsers, FaChartLine } from "react-icons/fa";
import { BsShield } from "react-icons/bs";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";
import GradientUI from "../../../Components/GradientUI/GradientUI";

const UltraModernWhoWeAre = () => {
  const features = [
    {
      id: 1,
      title: "Core Values",
      description:
        "Integrity, Innovation, Customer-Centricity, and Excellence—our core values drive every decision we make.",
      icon: <BsShield />,
    },
    {
      id: 2,
      title: "Mission Statement",
      description:
        "To streamline asset management through smart, secure, and user-friendly solutions that improve business efficiency.",
      icon: <FaBullseye />,
      featured: true,
    },
    {
      id: 3,
      title: "Our Services",
      description:
        "Custom asset tracking, powerful data management, and advanced security—everything in one platform.",
      icon: <FaChartBar />,
    },
    {
      id: 4,
      title: "Our Approach",
      description:
        "Simple, intuitive, and designed for you—our system prioritizes usability without sacrificing power.",
      icon: <FaUsers />,
    },
    {
      id: 5,
      title: "What Sets Us Apart",
      description:
        "Real-time updates, customizable dashboards, and enterprise-level security make us stand out.",
      icon: <FaChartLine />,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 relative overflow-hidden">
      <GradientUI />
      <div className="max-w-7xl mx-auto">
        <HeaderSection
          title="Who We Are"
          description="We offer solutions that make your work easier, boost productivity, and keep things running smoothly and organized."
        />

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 lg:gap-8 mt-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`md:col-span-3 lg:col-span-4 ${
                feature.featured
                  ? "md:col-span-6 lg:col-span-4 md:row-span-2"
                  : ""
              }`}
            >
              <div className="h-full bg-white/60 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start mb-4">
                  <div className="text-primary-600 dark:text-primary-400 text-3xl mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Only show button for featured cards that are not ID 2 */}
                {feature.featured && feature.id !== 2 && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center">
                      Learn more
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UltraModernWhoWeAre;
