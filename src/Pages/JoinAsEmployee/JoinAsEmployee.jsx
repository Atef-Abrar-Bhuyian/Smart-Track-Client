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

const JoinAsEmployee = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [showPass, setShowPass] = useState(false);
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
      <ReactHelmet title={"Join As Employee"}></ReactHelmet>
      <div className="md:flex justify-evenly gap-6">
        <div className="flex-1 flex flex-col items-center justify-center mb-6">
          <h1 className="text-center text-xl font-bold">
            Join us and take the first step toward a rewarding career.
          </h1>
          <Lottie
            animationData={joinAsEmployeeLottie}
            className="w-3/4"
          ></Lottie>
        </div>
        <div className="flex-1">
          <Card className="max-w-sm">
            <form
              onSubmit={handleJoinAsEmployee}
              className="flex flex-col gap-4"
            >
              {/* Name */}
              <div>
                <div className="mb-2 block">
                  <Label value="Full Name" />
                </div>
                <TextInput
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />
              </div>
              {/* photo */}
              <div>
                <div className="mb-2 block">
                  <Label value="Your Photo URL" />
                </div>
                <TextInput
                  type="url"
                  name="photo"
                  placeholder="Your Photo URL"
                  required
                />
              </div>
              {/* Date of Birth */}
              <div>
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
                </div>
              </div>
              <CustomBtn text={"Join as Employee"} type="submit"></CustomBtn>
            </form>
            <div className="divide-y divide-dashed">
              <div></div>
              <div>
                <h4 className="text-md font-bold text-center my-4">OR</h4>
                <button className="flex items-center justify-center gap-1 w-full text-center p-2 rounded-lg bg-cyan-600 text-white">
                  Continue With Google{" "}
                  <GrGoogle className="text-lg text-white" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JoinAsEmployee;
