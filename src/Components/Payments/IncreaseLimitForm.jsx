import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userHrInfo from "../../hooks/userHrInfo";

const IncreaseLimitForm = ({ selectedPackage, price }) => {
  const [error, setError] = useState("");
  const hrInfo = userHrInfo();
  const [clientSecret, setClientSecret] = useState("");
  const axiosPublic = useAxiosPublic();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    if (price > 0) {
      axiosPublic
        .post("/create-payment-intent", { price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
          setError("Failed to create payment intent. Please try again.");
        });
    }
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (!clientSecret) {
      setError("Payment intent not initialized. Please try again.");
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: hrInfo[0]?.email || "Anonymous",
            name: hrInfo[0]?.name || "Anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        try {
          const updatedUserInfo = {
            selectedPackage: selectedPackage,
          };

          const res = await axiosPublic.patch(
            `/users/${hrInfo[0]?.email}`,
            updatedUserInfo
          );

          if (res.data?.modifiedCount) {
            Swal.fire({
              title: "Payment Successful & Limit Increased!",
              text: "Thank you for your payment. Your limit has been increased successfully.",
              background: "#003333",
              color: "#fff",
              confirmButtonColor: "#001919",
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
              },
            });
            setError("");
            navigate("/");
          }
        } catch (err) {
          console.error("Error updating user information:", err);
          setError("Failed to update user information. Please try again.");
        }
      }
    }
  };

  return (
    <div>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="my-4 bg-blue-600 rounded-md p-2 cursor-pointer w-full font-bold text-white"
        type="button"
        onClick={handleSubmit}
        disabled={!stripe && !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
    </div>
  );
};

export default IncreaseLimitForm;
