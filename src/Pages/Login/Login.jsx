import React from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
  };

  return (
    <div>
      <ReactHelmet title={"Login"} />
      <div>
        <Card className="max-w-sm">
          <form
            onSubmit={(e) => handleLogin(e)}
            className="flex flex-col gap-4"
          >
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
              <div className="mb-2 block">
                <Label value="Your password" />
              </div>
              <TextInput name="password" type="password" required />
            </div>
            <div className="flex items-center gap-2">
              <p>Forgot Password?</p>
            </div>
            <button type="submit">
              Submit
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
