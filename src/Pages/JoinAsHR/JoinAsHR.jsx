import { Card, Label, Select, TextInput } from "flowbite-react";
import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomBtn from "../Shared/CustomBtn/CustomBtn";
import JoinAsHRLottie from "../../assets/lottieReact/joinAsHRLottie.json";
import { useNavigate } from "react-router-dom";


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
    <div className="my-20 w-4/5 mx-auto">
      <div className="lg:flex justify-evenly gap-6">
        {/* Left Side: Animation and Heading */}
        <div className="flex-1 flex flex-col items-center justify-center mb-6">
          <h1 className="text-center text-xl font-bold">
            Lead the way in building a smarter, stronger team.
          </h1>
          <Lottie animationData={JoinAsHRLottie} className="w-3/4"></Lottie>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1">
          <Card>
            <form onSubmit={handleJoinAsHR} className="flex flex-col gap-4">
              {/* Name & Company Name */}
              <div className="lg:flex gap-6">
                <div className="flex-1 mb-3">
                  <div className="mb-2 block">
                    <Label value="Your Name" />
                  </div>
                  <TextInput
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2 block">
                    <Label value="Company Name" />
                  </div>
                  <TextInput
                    type="text"
                    name="companyName"
                    placeholder="Your Company Name"
                    required
                  />
                </div>
              </div>

              {/* Company Logo */}
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label value="Company Logo" />
                </div>
                <TextInput
                  type="url"
                  name="companyLogo"
                  placeholder="Your Company Logo"
                  required
                />
              </div>

              {/* Your Photo */}
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label value="Your Photo" />
                </div>
                <TextInput
                  type="url"
                  name="photo"
                  placeholder="Your Photo"
                  required
                />
              </div>

              {/* Date of Birth & Plan Selection */}
              <div className="md:flex gap-6">
                <div className="flex-1 mb-3">
                  <div className="mb-2 block">
                    <Label value="Date of Birth" />
                  </div>
                  <DatePicker
                    className="border-cyan-600 rounded-xl"
                    name="dateOfBirth"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2 block">
                    <Label value="Select a Plan" />
                  </div>
                  <Select name="selectedPackage" required>
                    <option value={"basic"}>Basic Plan 5$</option>
                    <option value={"advance"}>Advanced Plan 8$</option>
                    <option value={"ultimate"}>Ultimate Plan 15$</option>
                  </Select>
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="mb-2 block">
                  <Label value="Your email" />
                </div>
                <TextInput
                  type="email"
                  name="email"
                  placeholder="your email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2">
                  <Label value="Your password" />
                </div>
                <div className="relative">
                  <TextInput
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="your password"
                    required
                  />
                  <button
                    className="absolute top-3 right-3 text-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPass(!showPass);
                    }}
                  >
                    {showPass ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>

              <CustomBtn
                text={"Pay and Join as HR"}
                type={"submit"}
              ></CustomBtn>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JoinAsHR;
