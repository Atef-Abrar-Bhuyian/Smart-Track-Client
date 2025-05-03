import { Button } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";

const PackagePrice = () => {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      features: [
        { text: "Basic Features", available: true },
        { text: "Maximum 5 employees", available: true },
        { text: "Basic dashboard", available: true },
        { text: "Premium Features", available: false },
        { text: "Limited updates", available: false },
        { text: "Unlimited Access", available: false },
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$4.99/month",
      features: [
        { text: "All Free features", available: true },
        { text: "Maximum 10 employee", available: true },
        { text: "Premium Features", available: true },
        { text: "Priority support", available: true },
        { text: "Unlimited Access", available: false },
        { text: "Complete documentation", available: false },
      ],
      highlight: true,
    },
    {
      name: "Ultimate",
      price: "$9.99/month",
      features: [
        { text: "Maximum 20 employees", available: true },
        { text: "All Basic Features", available: true },
        { text: "All Premium Features", available: true },
        { text: "Unlimited Access", available: true },
        { text: "Feature request priority", available: true },
        { text: "Complete documentation", available: true },
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-14 px-4 md:px-10 bg-white dark:bg-gray-900">
      <HeaderSection
        title={"Pricing Plans"}
        description={"Choose the plan that fits your learning journey."}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-10">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl border ${
              plan.highlight
                ? "border-cyan-600 shadow-xl scale-[1.02]"
                : "border-cyan-500/10 shadow-md"
            } bg-gradient-to-b from-white/80 to-white dark:from-gray-800/80 dark:to-gray-800 p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.03]`}
          >
            {plan.highlight && (
              <div className="absolute top-4 right-4 bg-cyan-600 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {plan.name}
            </h3>
            <p className="text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 mb-6">
              {plan.price}
            </p>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className={`flex items-center ${
                    feature.available
                      ? "text-cyan-600"
                      : "text-gray-400 line-through"
                  }`}
                >
                  <FaCheckCircle
                    className={`mr-2 ${
                      feature.available ? "text-cyan-500" : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm">{feature.text}</span>
                </li>
              ))}
            </ul>

            <Button
              color="cyan"
              className="w-full font-semibold tracking-wide hover:scale-105"
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PackagePrice;
