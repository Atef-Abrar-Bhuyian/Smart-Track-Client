import { Elements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import payment from "../../assets/lottieReact/payment.json";
import Lottie from "lottie-react";
import userHrInfo from "../../hooks/userHrInfo";
import IncreaseLimitForm from "../../Components/Payments/IncreaseLimitForm";
import { Label, Select } from "flowbite-react";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import HeaderSection from "../../Components/HeaderSection/HeaderSection";

// Load Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const IncreaseLimit = () => {
  const hrInfo = userHrInfo();
  const [price, setPrice] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState("");

  const handleSelectedPlan = (e) => {
    const selectedValue = e.target.value;
    setSelectedPackage(selectedValue);
    if (selectedValue === "basic") {
      setPrice(5);
    }
    if (selectedValue === "advance") {
      setPrice(8);
    }
    if (selectedValue === "ultimate") {
      setPrice(15);
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center dark:bg-gray-900">
      <ReactHelmet title={"Increase Limit"}></ReactHelmet>
      <div className="flex flex-col-reverse md:flex-row-reverse justify-center items-center w-11/12 mx-auto pt-24">
        <div className="md:w-2/4 mx-auto mt-4">
          <HeaderSection title={"Kindly Pay to Increase Your Limit"} />
          <p className="text-center mb-6 dark:text-cyan-500">
            Current Selected Package Is: {hrInfo[0]?.selectedPackage}
          </p>

          <div className="max-w-md mb-10">
            <div className="mb-2 block">
              <Label value="Select your country" />
            </div>
            <Select
              defaultValue={"none"}
              onChange={handleSelectedPlan}
              required
            >
              <option disabled value={"none"}>
                Select a Plan
              </option>
              <option value={"basic"}>Basic 5$</option>
              <option value={"advance"}>Advance 8$</option>
              <option value={"ultimate"}>Ultimate 15$</option>
            </Select>
          </div>

          {/* Payment Form */}
          <Elements stripe={stripePromise}>
            <IncreaseLimitForm
              selectedPackage={selectedPackage}
              price={price}
            />
          </Elements>
        </div>

        <div className="md:w-1/4 mx-auto">
          <Lottie animationData={payment}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default IncreaseLimit;
