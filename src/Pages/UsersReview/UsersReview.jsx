import React from "react";
import { Card } from "flowbite-react";
import { Fade } from "react-awesome-reveal";

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
    <div className="min-h-screen py-12 flex flex-col items-center">
      <Fade>
        <h1 className="text-4xl font-bold mb-8">What Users Say</h1>
      </Fade>
      <Fade delay={500}>
        <div className="w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-cyan-700 rounded-xl shadow-lg p-6 text-center"
            >
              <img
                className="w-20 h-20 rounded-full mx-auto"
                src={testimonial.picture}
                alt={testimonial.name}
              />
              <h2 className="text-xl font-bold mt-4 mb-2 text-white">
                {testimonial.name}
              </h2>
              <p className="text-white italic">"{testimonial.review}"</p>
            </Card>
          ))}
        </div>
      </Fade>
    </div>
  );
}
