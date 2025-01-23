import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckOutForm from "../../Components/Payments/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import payment from "../../assets/lottieReact/payment.json";
import Lottie from "lottie-react";

// Load Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const PaymentPage = () => {
  const location = useLocation(); 
  const { userInfo } = location?.state || {};


  return (
    <div className="w-11/12 mx-auto">
      <div className="flex flex-col-reverse md:flex-row-reverse justify-center items-center">
      <div className="md:w-2/4 mx-auto">
        <h1 className="text-xl font-bold text-center my-12">Kindly Pay to Create Your Account</h1>
          {/* Payment Form */}
          <Elements stripe={stripePromise}>
            <CheckOutForm userInfo={userInfo} />
          </Elements>
        </div>

        <div className="md:w-1/4 mx-auto">
          <Lottie animationData={payment}></Lottie>
        </div>
        
      </div>
    </div>
  );
};

export default PaymentPage;
