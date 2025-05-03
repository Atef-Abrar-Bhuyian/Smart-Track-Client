import React from "react";
import { Card } from "flowbite-react";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import GradientUI from "../../Components/GradientUI/GradientUI";
import HeaderSection from "../../Components/HeaderSection/HeaderSection";

const pricingPlans = [
  {
    title: "Basic",
    price: "$5/month",
    features: ["Basic Features", "Maximum 5 employees","Basic dashboard"],
    unavailable: [
      "Premium Features",
      "Limited updates",
      "Unlimited Access",
    ],
  },
  {
    title: "Pro",
    price: "$8/month",
    features: [
      "All Free features",
      "Maximum 10 employee",
      "Premium Features",
      "Priority support",
    ],
    unavailable: ["Unlimited Access", "Complete documentation"],
  },
  {
    title: "Ultimate",
    price: "$15/month",
    features: [
      "Maximum 20 employees",
      "All Basic Features",
      "All Premium Features",
      "Unlimited Access",
      "Complete documentation",
    ],
    unavailable: [],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen py-10 mt-14 px-4 md:px-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 transition-colors relative overflow-hidden">
      <ReactHelmet title={"Price Plans"} />
      <HeaderSection title={"Choose Your Plane"} />
      <GradientUI />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <Card
            key={index}
            className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
            <p className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 mb-6">
              {plan.price}
            </p>

            <ul className="mb-6 space-y-2 text-left text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <BsCheckCircle
                    className="text-cyan-600 dark:text-cyan-400"
                    size={18}
                  />
                  <span>{feature}</span>
                </li>
              ))}
              {plan.unavailable.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-gray-400 dark:text-gray-500"
                >
                  <BsXCircle className="text-red-500" size={18} />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              to="/joinAsHR"
              className="w-full inline-block bg-cyan-600 hover:bg-cyan-800 text-white py-2 px-4 rounded-lg font-semibold transition"
            >
              Choose {plan.title}
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
