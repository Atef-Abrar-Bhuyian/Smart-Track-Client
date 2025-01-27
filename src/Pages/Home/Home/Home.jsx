import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
import ReactHelmet from "../../../Components/ReactHelmet/ReactHelmet";
import WhoWeAre from "../WhoWeAre/WhoWeAre";
import PackagePrice from "../PackagePrice/PackagePrice";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import useUserInTeamOrNot from "../../../hooks/useUserInTeamOrNot";
import EmployeePendingRequests from "../EmployeePendingRequests/EmployeePendingRequests";
import EmployeeRequestOfOneMonth from "../EmployeeRequestOfOneMonth/EmployeeRequestOfOneMonth";
import CalanderSection from "../CalanderSection/CalanderSection";
import UpcommingEvents from "../UpcommingEvents/UpcommingEvents";
import ContactYourHr from "../ContactYourHr/ContactYourHr";
import PendingRequestsForHr from "../PendingRequestsForHr/PendingRequestsForHr";
import TopRequestedItems from "../TopRequestedItems/TopRequestedItems";
import LimitedStockItems from "../LimitedStockItems/LimitedStockItems";
import RequestedItemsOverview from "../RequestedItemsOverview/RequestedItemsOverview";

const Home = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [cUser] = useUserInTeamOrNot();

  return (
    <div>
      <ReactHelmet title={"Home"}></ReactHelmet>
      <Banner></Banner>
      <WhoWeAre></WhoWeAre>
      {!user && <PackagePrice></PackagePrice>}
      {isAdmin && <PackagePrice></PackagePrice>}
      {cUser?.team === "in-a-team" && !isAdmin && (
        <EmployeePendingRequests></EmployeePendingRequests>
      )}
      {cUser?.team === "in-a-team" && !isAdmin && (
        <EmployeeRequestOfOneMonth></EmployeeRequestOfOneMonth>
      )}
      {cUser?.team === "in-a-team" && !isAdmin && (
        <CalanderSection></CalanderSection>
      )}
      {cUser?.team === "in-a-team" && !isAdmin && (
        <UpcommingEvents></UpcommingEvents>
      )}
      {cUser?.team === "not-in-team" && !isAdmin && (
        <ContactYourHr></ContactYourHr>
      )}
      {isAdmin && <PendingRequestsForHr></PendingRequestsForHr>}
      {isAdmin && <TopRequestedItems></TopRequestedItems>}
      {isAdmin && <LimitedStockItems></LimitedStockItems>}
      {isAdmin && <RequestedItemsOverview></RequestedItemsOverview>}
    </div>
  );
};

export default Home;
