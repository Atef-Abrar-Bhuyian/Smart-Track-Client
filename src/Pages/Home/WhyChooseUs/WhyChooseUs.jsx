import React from "react";
import { Card } from "flowbite-react";
import { Fade } from "react-awesome-reveal";
import HeadingWithDes from "../../Shared/HeadingWithDes/HeadingWithDes";

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🚀",
      title: "Effortless Asset Management",
      description:
        "Keep track of all your assets in one place with a seamless experience.",
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description:
        "Your data is encrypted and protected with industry-standard security.",
    },
    {
      icon: "📊",
      title: "Real-Time Insights",
      description:
        "Get instant reports and analytics to make data-driven decisions.",
    },
    {
      icon: "⚡",
      title: "Fast & User-Friendly",
      description:
        "A smooth experience with an optimized and responsive design.",
    },
    {
      icon: "💼",
      title: "For Businesses & Individuals",
      description:
        "Whether for company assets or personal inventory, we have the perfect solution.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-10 bg-white dark:bg-gray-900">
      <div className="text-center">
        <Fade>
          <HeadingWithDes
            heading="Why Choose Us?"
            description="Smart asset management with security, efficiency, and real-time insights."
          />
        </Fade>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Fade key={index} cascade damping={0.1}>
            <Card className="rounded-3xl border border-cyan-500/10 bg-gradient-to-b from-white/80 to-white dark:from-gray-800/80 dark:to-gray-800 shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.03]">
              <div className="text-4xl text-cyan-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </Card>
          </Fade>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
