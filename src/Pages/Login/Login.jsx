import React, { useContext, useState } from "react";
import { Card, Label, TextInput } from "flowbite-react";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import CustomBtn from "../Shared/CustomBtn/CustomBtn";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lottieReact/loginLottie.json";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { setUser, signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate("/");
        setUser(user);
      })
      .catch(() => {
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
    <div className="py-20 dark:bg-gray-900">
      <ReactHelmet title={"Login"} />
      <div className="md:flex justify-between">
        <div className="flex-1 flex items-center justify-center mb-6">
          <Lottie animationData={loginLottie} className="w-2/4" />
        </div>
        <div className="flex-1">
          <Card className="max-w-sm">
            <h1 className="text-2xl font-bold text-center text-cyan-600">
              Login
            </h1>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Demo Credentials Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  className="bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-800 transition"
                  onClick={() => {
                    setEmail("xyz@employee.com");
                    setPassword("Xyzemployee1");
                  }}
                >
                  Demo Employee Credentials
                </button>
                <button
                  type="button"
                  className="bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-800 transition"
                  onClick={() => {
                    setEmail("xyz@hr.com");
                    setPassword("Xyzhr1");
                  }}
                >
                  Demo HR Credentials
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Link to={"/forget-password"}>
                  <Label className="underline cursor-pointer">
                    Forget Password?
                  </Label>
                </Link>
              </div>
              <CustomBtn text={"Login"} type="submit" />
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
