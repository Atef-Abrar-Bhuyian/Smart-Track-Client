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
    <section className="mt-32 w-11/12 mx-auto">
      <div className="text-center">
        <Fade>
          <HeadingWithDes
            heading={"Why Choose Us?"}
            description={
              "Smart asset management with security, efficiency, and real-time insights."
            }
          ></HeadingWithDes>
        </Fade>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 mx-auto mt-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-cyan-700 p-6 rounded-2xl shadow-lg text-center border-none"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              {feature.title}
            </h3>
            <p className="text-gray-200 text-sm">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
