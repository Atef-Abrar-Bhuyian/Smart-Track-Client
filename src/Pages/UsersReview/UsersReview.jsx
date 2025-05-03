import React from "react";
import { Fade } from "react-awesome-reveal";
import HeaderSection from "../../Components/HeaderSection/HeaderSection";

const testimonials = [
  {
    name: "John Doe",
    picture:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-501272-1222271.jpg&fm=jpg",
    review: "This service exceeded my expectations!",
  },
  {
    name: "Jane Smith",
    picture:
      "https://st2.depositphotos.com/1715570/5435/i/450/depositphotos_54357355-stock-photo-handsome-young-black-man-smiling.jpg",
    review: "Incredible experience, highly recommended.",
  },
  {
    name: "Mike Johnson",
    picture:
      "https://media.istockphoto.com/id/937519550/photo/successful-young-handsome-american-guy-banker-in-formal-outfit-on-pure-background-with-crossed.jpg?s=612x612&w=0&k=20&c=FytjzWc7etouTdoofqR0InMH5I7Sttu4jPR9BKfy33Y=",
    review: "The best investment I've made this year!",
  },
  {
    name: "Emily Davis",
    picture:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg",
    review: "User-friendly and efficient, love it!",
  },
  {
    name: "Robert Brown",
    picture:
      "https://st4.depositphotos.com/1591576/20942/i/450/depositphotos_209420114-stock-photo-close-horizontal-portrait-stubble-bearded.jpg",
    review: "Their customer support is top-notch!",
  },
  {
    name: "Sophia Wilson",
    picture:
      "https://img.freepik.com/free-photo/successful-female-entrepreneur-blue-collar-shirt_176420-28479.jpg",
    review: "Affordable pricing and great features!",
  },
  {
    name: "David Martinez",
    picture:
      "https://images.pexels.com/photos/7699319/pexels-photo-7699319.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    review: "A must-have for anyone looking to grow!",
  },
  {
    name: "Olivia Taylor",
    picture:
      "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
    review: "This platform has changed my workflow.",
  },
  {
    name: "James Anderson",
    picture:
      "https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg",
    review: "Reliable and packed with great tools.",
  },
  {
    name: "Linda White",
    picture:
      "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg",
    review: "I can't imagine working without it now!",
  },
  {
    name: "Daniel Harris",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6v6GH5g6rq13v2GK4gThYqRZHqJrRFeCv41st0D-eljHkPfdrpmupJyp4iQLq7fvfjo&usqp=CAU",
    review: "Smooth experience, no complaints!",
  },
  {
    name: "Emma Clark",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFukcrmdzcWDuyo1iiSD8S7SMp0KhpoJgDY5mSRszyxoZd3Qc43r4AigylnnUfXF1eloA&usqp=CAU",
    review: "Great value for money, highly recommended!",
  },
];

export default function UsersReview() {
  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-tr from-[#e0f7fa] to-[#fff] dark:from-gray-900 dark:to-gray-800">
      <div className="mt-5">
        <HeaderSection title={"Hear From Our Customers"} />
      </div>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Fade key={index} delay={index * 50} triggerOnce={true}>
            <div className="relative bg-white/30 dark:bg-white/10 backdrop-blur-lg border border-white/30 dark:border-white/20 rounded-2xl p-6 shadow-xl text-center transition-all duration-300 hover:scale-[1.02]">
              <img
                src={testimonial.picture}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 italic">
                “{testimonial.review}”
              </p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
