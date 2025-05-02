import React, { useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Lottie from "lottie-react";
import bannerHr from "../../../assets/lottieReact/bannerHR.json";
import bannerEmployee from "../../../assets/lottieReact/bannerEmployee.json";
import { useNavigate } from "react-router-dom";

const LottieAnimation = ({ className, animationData }) => {
  return (
    <div className={`${className} rounded-lg`}>
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="w-full h-full"
      />
    </div>
  );
};

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Empowering Your Team",
      gradient: "from-cyan-500 to-blue-500",
      buttonGradient:
        "from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500",
      description:
        "Discover innovative HR solutions that streamline recruitment, boost employee engagement, and drive organizational success.",
      buttonText: "Join as HR Manager",
      path: "/joinAsHR",
      animation: bannerHr,
    },
    {
      id: 2,
      title: "Unleash Your Potential",
      gradient: "from-cyan-500 to-blue-500",
      buttonGradient:
        "from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500",
      description:
        "Explore opportunities, enhance your skills, and achieve your career goals in a supportive and inspiring workplace.",
      buttonText: "Join as Employee",
      path: "/joinAsEmployee",
      animation: bannerEmployee,
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 py-16 mt-14">
      {/* Background abstract shapes (darkened) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-700 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12">
          {/* Text content */}
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
            <h1
              className={`text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r ${slides[activeSlide].gradient} inline-block text-transparent bg-clip-text`}
            >
              {slides[activeSlide].title}
            </h1>
            <p className="text-lg text-gray-300 mb-6 max-w-xl">
              {slides[activeSlide].description}
            </p>
            <button
              className={`group relative px-6 py-3 font-medium text-white rounded-lg overflow-hidden bg-gradient-to-r ${slides[activeSlide].buttonGradient} shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95`}
              onClick={() => navigate(slides[activeSlide]?.path)}
            >
              <span className="relative flex items-center gap-2">
                {slides[activeSlide].buttonText}
                <MdOutlineKeyboardDoubleArrowRight className="text-xl" />
              </span>
            </button>
          </div>

          {/* Lottie animation */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="max-w-lg mx-auto">
              <LottieAnimation
                className="w-full h-64 md:h-80"
                animationData={slides[activeSlide].animation}
              />
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "bg-cyan-500 w-6"
                  : "bg-gray-600 hover:bg-cyan-600"
              }`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
