import React from "react";
import Banner from "../Banner/Banner";
import ReactHelmet from "../../../Components/ReactHelmet/ReactHelmet";
import WhoWeAre from "../WhoWeAre/WhoWeAre";

const Home = () => {
  return (
    <div>
      <ReactHelmet title={"Home"}></ReactHelmet>
      <Banner></Banner>
      <WhoWeAre></WhoWeAre>
    </div>
  );
};

export default Home;
