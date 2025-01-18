import React from "react";
import Banner from "../Banner/Banner";
import ReactHelmet from "../../../Components/ReactHelmet/ReactHelmet";
import WhoWeAre from "../WhoWeAre/WhoWeAre";
import PackagePrice from "../PackagePrice/PackagePrice";

const Home = () => {
  return (
    <div>
      <ReactHelmet title={"Home"}></ReactHelmet>
      <Banner></Banner>
      <WhoWeAre></WhoWeAre>
      <PackagePrice></PackagePrice>
    </div>
  );
};

export default Home;
