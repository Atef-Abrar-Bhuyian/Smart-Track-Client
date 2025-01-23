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

  console.log(userInfo);

  // // Create user and update profile
  // createUser(email, password)
  //   .then((result) => {
  //     updateUserProfile(name, companyLogo)
  //       .then(() => {
  //         // Create user entry in the database
  //         const userInfo = {
  //           name: name,
  //           photo: photo,
  //           companyName: companyName,
  //           companyLogo: companyLogo,
  //           dateOfBirth: dateOfBirth,
  //           email: email,
  //           selectedPackage: selectedPackage,
  //           role: "HR",
  //           transactionId: transactionId, // Include transaction ID
  //         };
  //         axiosPublic.post("/users", userInfo).then((res) => {
  //           if (res.data.insertedId) {
  //             Swal.fire({
  //               title: "Profile Created Successfully",
  //               background: "#003333",
  //               color: "#fff",
  //               confirmButtonColor: "#001919",
  //               showClass: {
  //                 popup: `
  //                   animate__animated
  //                   animate__fadeInUp
  //                   animate__faster
  //                 `,
  //               },
  //               hideClass: {
  //                 popup: `
  //                   animate__animated
  //                   animate__fadeOutDown
  //                   animate__faster
  //                 `,
  //               },
  //             });
  //             navigate("/");
  //           }
  //         });
  //       })
  //       .catch((err) => {
  //         console.log("Error updating profile:", err);
  //       });
  //   })
  //   .catch((err) => {
  //     console.log("Error creating user:", err);
  //   });

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
