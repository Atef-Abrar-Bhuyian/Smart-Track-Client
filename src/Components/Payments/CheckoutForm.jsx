import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const CheckOutForm = ({ userInfo }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosPublic = useAxiosPublic();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);

  useEffect(() => {
    if (userInfo?.price > 0) {
      axiosPublic
        .post("/create-payment-intent", {
          price: userInfo?.price,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
          // console.log("Client Secret:", res.data.clientSecret);
        })
        .catch((err) => {
          // console.error("Error creating payment intent:", err);
          setError("Failed to create payment intent. Please try again.");
        });
    }
  }, [userInfo?.price]);

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
      // console.log("Payment Error: ", error);
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
            email: userInfo?.email || "Anonymous",
            name: userInfo?.name || "Anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log("Confirm error:", confirmError);
      setError(confirmError.message);
    } else {
      // console.log("Payment intent:", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const updatedUserInfo = {
          ...userInfo,
          role: "HR",
          transactionId: paymentIntent.id,
        };

        await createUser(userInfo?.email, userInfo?.password);

        // Update Firebase user profile
        await updateUserProfile(userInfo?.name, userInfo?.photo);

        // Create user in the database
        const res = await axiosPublic.post("/users", updatedUserInfo);

        if (res.data?.insertedId) {
          Swal.fire({
            title: "Payment Successful & Account Created!",
            text: "Thank you for your payment. Your account has been successfully created.",
            background: "#0f172a", // Dark slate tone
            color: "#e0f2f1",       // Soft light teal text
            icon: "success",
            iconColor: "#06b6d4",   // Cyan from Flowbite (tailwind's cyan-400)
            confirmButtonColor: "#06b6d4", // Matching button color
            confirmButtonText: "Awesome!",
            customClass: {
              popup: "rounded-xl shadow-lg px-6 py-4",
              title: "text-xl font-semibold",
              confirmButton: "text-white font-medium",
            },
            showClass: {
              popup: "animate__animated animate__fadeInUp animate__faster",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutDown animate__faster",
            },
          });          
          setError("");
          logOut();
          navigate("/");
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
        // disabled={!stripe}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
    </div>
  );
};

export default CheckOutForm;
