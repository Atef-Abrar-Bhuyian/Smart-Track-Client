import React from "react";
import bannerHr from "../../../assets/lottieReact/bannerHR.json";
import bannerEmployee from "../../../assets/lottieReact/bannerEmployee.json";
import Lottie from "lottie-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import CustomBtn from "../../Shared/CustomBtn/CustomBtn";

const Banner = () => {
  return (
    <div className="mt-10 md:w-11/12 mx-auto">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex flex-col-reverse md:flex-row justify-between items-center cursor-pointer">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-3">Empowering Your Team</h1>
              <p className="md:w-3/4 mb-3 mx-auto">
                Discover innovative HR solutions that streamline recruitment,
                boost employee engagement, and drive organizational success
              </p>
              <Link to={"/joinAsHR"}>
                <button className="inline-flex justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900">
                  Join as HR Manager
                </button>
              </Link>
            </div>
            <Lottie
              animationData={bannerHr}
              className="w-6/12 lg:w-2/4"
            ></Lottie>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col-reverse md:flex-row justify-between items-center cursor-pointer">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-3">
                Unleash Your Potential
              </h1>
              <p className="md:w-3/4 mb-3 mx-auto">
                Explore opportunities, enhance your skills, and achieve your
                career goals in a supportive and inspiring workplace.
              </p>
              <Link to={"/joinAsEmployee"}>
                <button className="inline-flex justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900">
                  Join as Employee
                </button>
              </Link>
            </div>
            <Lottie
              animationData={bannerEmployee}
              className="w-2/4 lg:w-2/4"
            ></Lottie>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
