import { Card, FileInput, Label, Select, TextInput } from "flowbite-react";
import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomBtn from "../Shared/CustomBtn/CustomBtn";
import JoinAsHRLottie from "../../assets/lottieReact/joinAsHRLottie.json";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const JoinAsHR = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleJoinAsHR = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const companyName = form.companyName.value;
    const companyLogo = form.companyLogo.value;
    const email = form.email.value;
    const password = form.password.value;
    const dateOfBirth = form.dateOfBirth.value;
    const selectedPackage = form.selectedPackage.value;

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

    createUser(email, password).then((result) => {
      updateUserProfile(name, companyLogo)
        .then(() => {
          // create user entry in the database
          const userInfo = {
            name: name,
            companyName: companyName,
            companyLogo: companyLogo,
            dateOfBirth: dateOfBirth,
            email: email,
            password: password,
            selectedPackage: selectedPackage,
            role: "HR",
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Profile Created Successfully",
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
              navigate("/");
            }
          });
        })
        .catch((err) => {
          console.log("Error Here", err);
        });
    });
  };

  return (
    <div className="my-20 w-4/5 mx-auto">
      <div className="lg:flex justify-evenly gap-6">
        <div className="flex-1 flex flex-col items-center justify-center mb-6">
          <h1 className="text-center text-xl font-bold">
            Lead the way in building a smarter, stronger team.
          </h1>
          <Lottie animationData={JoinAsHRLottie} className="w-3/4"></Lottie>
        </div>
        <div className="flex-1">
          <Card className="">
            <form onSubmit={handleJoinAsHR} className="flex flex-col gap-4">
              {/* Name & comapnay name */}
              <div className="lg:flex gap-6">
                {/* name */}
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
                {/* Comapny Name */}
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

              {/* Company logo */}
              <div id="fileUpload" className="max-w-md">
                <div className="mb-2 block">
                  <Label value="Comapny Logo" />
                </div>
                {/* <FileInput
                  id="file"

                  helperText="A profile picture is useful to confirm your are logged into your account"
                /> */}

                <TextInput
                  type="url"
                  name="companyLogo"
                  placeholder="Your Company Name"
                  required
                />
              </div>

              {/* Date of Birth */}
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
                    <Label value="Select a Package" />
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
              <CustomBtn text={"Join as Employee"} type="submit"></CustomBtn>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JoinAsHR;
