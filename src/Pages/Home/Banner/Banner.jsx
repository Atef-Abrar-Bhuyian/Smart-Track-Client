import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import bannerHr from "../../../assets/lottieReact/bannerHR.json";
import bannerEmployee from "../../../assets/lottieReact/bannerEmployee.json";
import Lottie from "lottie-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="mt-10 md:mt-0">
      <AwesomeSlider
        style={{ backgroundColor: "white", height:"550px" }}
        animation="cubeAnimation"
      >
        <div
          className="flex flex-col-reverse md:flex-row justify-between w-3/4 items-center"
          style={{ backgroundColor: "white" }}
        >
          <div>
            <h1 className="text-4xl font-bold mb-3">
              Empowering Your Workforce
            </h1>
            <p className="w-3/4 mb-3">
              Discover innovative HR solutions that streamline recruitment,
              boost employee engagement, and drive organizational success
            </p>
            <Link to={"/hrReg"}>
              <Button>Join as HR Manager</Button>
            </Link>
          </div>
          <Lottie animationData={bannerHr} className="w-3/4 lg:w-2/4"></Lottie>
        </div>
        <div
          className="flex flex-col-reverse md:flex-row text-center justify-between md:w-3/4 items-center"
          style={{ backgroundColor: "white" }}
        >
          <div>
            <h1 className="text-4xl font-bold mb-3">Unleash Your Potential</h1>
            <p className="mb-3">
              Explore opportunities, enhance your skills, and achieve your
              career goals in a supportive and inspiring workplace.
            </p>
            <Link className="flex items-center justify-center" to={"/employeeReg"}>
              <Button>Join as an Employee</Button>
            </Link>
          </div>
          <Lottie
            animationData={bannerEmployee}
            className="w-3/4 lg:w-2/4"
          ></Lottie>
        </div>
      </AwesomeSlider>
    </div>
  );
};

export default Banner;
