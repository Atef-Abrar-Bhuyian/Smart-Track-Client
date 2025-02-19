import React from "react";
import { Card } from "flowbite-react";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

const pricingPlans = [
  {
    title: "Basic",
    price: "$10/month",
    features: ["Maximum 5 employees", "Basic Features"],
    unavailable: [
      "Premium Features",
      "Unlimited Access",
      "Complete documentation",
      "24/7 Chat Support",
    ],
  },
  {
    title: "Pro",
    price: "$25/month",
    features: [
      "Maximum 10 employees",
      "Basic Features",
      "Premium Features",
      "Unlimited Access",
    ],
    unavailable: ["Complete documentation", "24/7 Chat Support"],
  },
  {
    title: "Ultimate",
    price: "$50/month",
    features: [
      "Maximum 20 employees",
      "Basic Features",
      "Premium Features",
      "Unlimited Access",
      "Complete documentation",
      "24/7 Chat Support",
    ],
    unavailable: [],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen py-12 flex flex-col items-center">
        <ReactHelmet title={"Price Plans"}></ReactHelmet>
      <h1 className="text-4xl font-bold mb-8">Choose Your Plan</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {pricingPlans.map((plan, index) => (
          <Card
            key={index}
            className="bg-blue-100 rounded-xl shadow-lg p-6 text-center"
          >
            <h2 className="text-2xl font-semibold">{plan.title}</h2>
            <p className="text-xl font-bold text-blue-600 mb-6">{plan.price}</p>
            <ul className="mb-6 space-y-2 text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <BsCheckCircle className="text-green-500" size={20} />{" "}
                  {feature}
                </li>
              ))}
              {plan.unavailable.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-500">
                  <BsXCircle className="text-red-500" size={20} /> {feature}
                </li>
              ))}
            </ul>
            <Link to={"/joinAsHR"} className="w-full bg-cyan-600 hover:bg-cyan-800 text-white py-2 rounded-lg font-semibold transition">
              Choose {plan.title}
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
