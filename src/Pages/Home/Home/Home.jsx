import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
import ReactHelmet from "../../../Components/ReactHelmet/ReactHelmet";
import WhoWeAre from "../WhoWeAre/WhoWeAre";
import PackagePrice from "../PackagePrice/PackagePrice";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAdmin from "../../../hooks/useAdmin";
import useUserInTeamOrNot from "../../../hooks/useUserInTeamOrNot";
import EmployeePendingRequests from "../EmployeePendingRequests/EmployeePendingRequests";
import EmployeeRequestOfOneMonth from "../EmployeeRequestOfOneMonth/EmployeeRequestOfOneMonth";
import CalanderSection from "../CalanderSection/CalanderSection";

const Home = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const [cUser] = useUserInTeamOrNot();

  return (
    <div>
      <ReactHelmet title={"Home"}></ReactHelmet>
      <Banner></Banner>
      <WhoWeAre></WhoWeAre>
      {!user && <PackagePrice></PackagePrice>}
      {cUser?.team === "in-a-team" && !isAdmin && <EmployeePendingRequests></EmployeePendingRequests>}
      {cUser?.team === "in-a-team" && !isAdmin && <EmployeeRequestOfOneMonth></EmployeeRequestOfOneMonth>}
      {cUser?.team === "in-a-team" && !isAdmin && <CalanderSection></CalanderSection>}
    </div>
  );
};

export default Home;
