import React, { useContext, useState } from "react";
import { Card, Label, TextInput } from "flowbite-react";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import CustomBtn from "../Shared/CustomBtn/CustomBtn";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lottieReact/loginLottie.json";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GrGoogle } from "react-icons/gr";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { setUser, signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate("/");
        setUser(user);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Credential, Please Try Again",
          background: "#003333",
          color: "#fff",
          confirmButtonColor: "#001919",
        });
      });
  };

  return (
    <div className="my-20 w-11/12 mx-auto">
      <ReactHelmet title={"Login"} />
      <div className="md:flex justify-between">
        <div className="flex-1 flex items-center justify-center mb-6">
          <Lottie animationData={loginLottie} className="w-2/4"></Lottie>
        </div>
        <div className="flex-1">
          <Card className="max-w-sm">
          <h1 className="text-2xl font-bold text-center text-cyan-600">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
              <div className="flex items-center gap-2">
                <Link to={"/forget-password"}>
                  <Label className="underline cursor-pointer">
                    Forget Password?
                  </Label>
                </Link>
              </div>
              <CustomBtn text={"Login"} type="submit"></CustomBtn>
            </form>
            <div className="divide-y divide-dashed">
              <div></div>
              <div>
                <h4 className="text-md font-bold text-center my-4">OR</h4>
                <SocialLogin />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
