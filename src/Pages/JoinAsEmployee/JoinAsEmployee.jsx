import React, { useContext, useState } from "react";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import { Card, Label, TextInput } from "flowbite-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GrGoogle } from "react-icons/gr";
import Lottie from "lottie-react";
import joinAsEmployeeLottie from "../../assets/lottieReact/joinAsEmployeeLottie.json";
import CustomBtn from "../Shared/CustomBtn/CustomBtn";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { Fade } from "react-awesome-reveal";
import GradientUI from "../../Components/GradientUI/GradientUI";

const JoinAsEmployee = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleJoinAsEmployee = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const dateOfBirth = form.dateOfBirth.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

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
      updateUserProfile(name, photo)
        .then(() => {
          // create user entry in the database
          const userInfo = {
            name: name,
            photo: photo,
            dateOfBirth: dateOfBirth,
            email: email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Profile Created Successfully",
                background: "#0f172a", // Dark slate tone
              color: "#e0f2f1", // Soft light teal text
                confirmButtonColor: "#06b6d4", // Matching button color
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
          // console.log("Error Here", err);
        });
    });
  };

  return (
    <div className="py-16 mt-16 px-4 lg:px-0 dark:bg-gray-900 relative overflow-hidden">
      <ReactHelmet title="Join As Employee" />
      <GradientUI />
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
        {/* Left: Text & Animation */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <Fade cascade>
            <h1 className="text-3xl lg:text-4xl font-bold text-cyan-700 mb-4">
              Join us and take the first step toward a rewarding career
            </h1>
            <p className="text-gray-600 text-sm lg:text-base mb-6">
              Fill in the form to register as an employee and start your journey
              with us.
            </p>
            <Lottie
              animationData={joinAsEmployeeLottie}
              className="w-full max-w-md mx-auto"
            />
          </Fade>
        </div>

        {/* Right: Form Card */}
        <div className="lg:w-1/2">
          <Card className="shadow-lg rounded-xl border border-cyan-100">
            <h2 className="text-2xl font-bold text-center text-cyan-600 mb-4">
              Join As Employee
            </h2>

            <form
              onSubmit={handleJoinAsEmployee}
              className="flex flex-col gap-4"
            >
              {/* Name & Photo */}
              <div className="md:flex gap-4">
                <div className="w-full">
                  <Label value="Full Name" />
                  <TextInput
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="w-full">
                  <Label value="Photo URL" />
                  <TextInput
                    type="url"
                    name="photo"
                    placeholder="Your Photo URL"
                    required
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <Label value="Date of Birth" className="mr-4" />
                <DatePicker
                  name="dateOfBirth"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-cyan-600"
                />
              </div>

              {/* Email */}
              <div>
                <Label value="Your Email" />
                <TextInput
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label value="Password" />
                <div className="relative">
                  <TextInput
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute top-2.5 right-3 text-xl text-gray-500"
                  >
                    {showPass ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

              <CustomBtn text="Join as Employee" type="submit" />

              <div className="my-4 border-t border-dashed pt-4">
                <h4 className="text-center text-gray-500 font-semibold">OR</h4>
                <SocialLogin />
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JoinAsEmployee;
