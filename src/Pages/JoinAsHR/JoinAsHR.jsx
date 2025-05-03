import { Card, Label, Select, TextInput } from "flowbite-react";
import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomBtn from "../Shared/CustomBtn/CustomBtn";
import JoinAsHRLottie from "../../assets/lottieReact/joinAsHRLottie.json";
import { useNavigate } from "react-router-dom";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import GradientUI from "../../Components/GradientUI/GradientUI";

const JoinAsHR = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleJoinAsHR = (e) => {
    e.preventDefault();

    // Get form data
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const companyName = form.companyName.value;
    const companyLogo = form.companyLogo.value;
    const email = form.email.value;
    const password = form.password.value;
    const dateOfBirth = form.dateOfBirth.value;
    const selectedPackage = form.selectedPackage.value;
    let price = 0;

    // Set package price based on selection

    if (selectedPackage === "basic") {
      price = 5;
    }
    if (selectedPackage === "advance") {
      price = 8;
    }
    if (selectedPackage === "ultimate") {
      price = 15;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password Must Contain At Least 6 Characters");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password Must Contain At Least One Lowercase Letter");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password Must Contain At Least One Uppercase Letter");
      return;
    }

    // Update user info state
    const userInfo = {
      email,
      password,
      name,
      photo,
      companyName,
      companyLogo,
      dateOfBirth,
      selectedPackage,
      price,
    };

    navigate("/payment", { state: { userInfo } });
  };

  return (
    <div className="py-20 dark:bg-gray-900">
      <div className="pt-14 relative overflow-hidden">
      <GradientUI />
        <ReactHelmet title={"Join As HR"} />
        <div className="lg:flex justify-evenly gap-6">
          {/* Left Side: Animation and Heading */}
          <div className="flex-1 flex flex-col items-center justify-center mb-6 w-[80%]">
            <Lottie animationData={JoinAsHRLottie} className="w-3/4" />
          </div>

          {/* Right Side: Form */}
          <div className="flex-1">
            <Card className="md:w-[80%] mx-auto">
              <h1 className="text-2xl text-center text-cyan-600 font-bold mb-4">
                Join As HR
              </h1>
              <form onSubmit={handleJoinAsHR} className="flex flex-col gap-4">
                {/* Name & Company Name */}
                <div className="lg:flex gap-6">
                  <div className="flex-1">
                    <Label value="Your Name" className="mb-2 block" />
                    <TextInput
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label value="Company Name" className="mb-2 block" />
                    <TextInput
                      type="text"
                      name="companyName"
                      placeholder="Your Company Name"
                      required
                    />
                  </div>
                </div>

                {/* Company Logo */}
                <div>
                  <Label value="Company Logo" className="mb-2 block" />
                  <TextInput
                    type="url"
                    name="companyLogo"
                    placeholder="Your Company Logo"
                    required
                  />
                </div>

                {/* Your Photo */}
                <div>
                  <Label value="Your Photo" className="mb-2 block" />
                  <TextInput
                    type="url"
                    name="photo"
                    placeholder="Your Photo"
                    required
                  />
                </div>

                {/* Date of Birth & Plan */}
                <div className="md:flex gap-6">
                  <div className="flex-1">
                    <Label value="Date of Birth" className="mb-2 block" />
                    <DatePicker
                      className="border-cyan-600 rounded-xl w-full"
                      name="dateOfBirth"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                  <div className="flex-1">
                    <Label value="Select a Plan" className="mb-2 block" />
                    <Select name="selectedPackage" required>
                      <option value={"basic"}>Basic Plan 5$</option>
                      <option value={"advance"}>Advanced Plan 8$</option>
                      <option value={"ultimate"}>Ultimate Plan 15$</option>
                    </Select>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label value="Your email" className="mb-2 block" />
                  <TextInput
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <Label value="Your password" className="mb-2 block" />
                  <div className="relative">
                    <TextInput
                      name="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute top-3 right-3 text-lg text-gray-600 dark:text-gray-300"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>
                  )}
                </div>

                <CustomBtn text={"Pay and Join as HR"} type={"submit"} />
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAsHR;
