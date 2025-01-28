import React, { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../provider/AuthProvider";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

const ProfilePage = () => {
  const { user } = useAuth();
    console.log(user);

  return (
    <div>
      <ReactHelmet title={"My Profile"}></ReactHelmet>
      <div className="bg-blue-100 w-full h-40 relative"></div>
      <div className="bg-white h-20 top-10 flex items-center justify-center border-4 w-4/6 mx-auto">
        {/* <img src={user?.} alt="" /> */}
      </div>
    </div>
  );
};

export default ProfilePage;
