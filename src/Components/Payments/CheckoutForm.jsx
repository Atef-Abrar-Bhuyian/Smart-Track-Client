import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

const CheckOutForm = ({ userInfo }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (userInfo?.price > 0) {
      axios
        .post("http://localhost:5000/create-payment-intent", {
          price: userInfo?.price,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
          console.log("Client Secret:", res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
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
      console.log("Payment Error: ", error);
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
      console.log("Confirm error:", confirmError);
      setError(confirmError.message);
    } else {
      console.log("Payment intent:", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: userInfo?.email,
          price: userInfo?.price,
          transectionId: paymentIntent.id,
          date: new Date(),
        };

        const res = await axios.post("/payment", payment);
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "middle-center",
            icon: "success",
            title: "Thank you. Your Payment is Successful",
            background: "#000",
            color: "#fff",
            showConfirmButton: false,
            timer: 1500,
          });
          setPaymentSuccess(true);
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
