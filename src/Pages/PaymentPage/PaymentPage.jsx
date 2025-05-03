import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckOutForm from "../../Components/Payments/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import payment from "../../assets/lottieReact/payment.json";
import Lottie from "lottie-react";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

// Load Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const PaymentPage = () => {
  const location = useLocation(); 
  const { userInfo } = location?.state || {};


  return (
    <div className="py-12 dark:bg-gray-900 min-h-screen flex items-center justify-center">
  <ReactHelmet title={"Payment"} />

  <div className="grid md:grid-cols-2 gap-12 items-center">
    {/* Animation Section */}
    <div className="order-1 md:order-none">
      <Lottie animationData={payment} className="w-full max-w-sm mx-auto" />
    </div>

    {/* Payment Form Section */}
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8">
      <h1 className="text-2xl font-semibold text-center text-cyan-600 mb-6">
        Kindly Pay to Create Your Account
      </h1>
      <Elements stripe={stripePromise}>
        <CheckOutForm userInfo={userInfo} />
      </Elements>
    </div>
  </div>
</div>

  );
};

export default PaymentPage;
