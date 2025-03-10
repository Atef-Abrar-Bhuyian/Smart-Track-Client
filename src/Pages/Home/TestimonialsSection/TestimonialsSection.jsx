import { Avatar, Card } from "flowbite-react";
import React from "react";
import HeadingWithDes from "../../Shared/HeadingWithDes/HeadingWithDes";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Doe",
      picture:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-501272-1222271.jpg&fm=jpg",
      feedback:
        "This platform has streamlined our asset management like never before!",
    },
    {
      name: "Jane Smith",
      picture:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg",
      feedback: "User-friendly and efficient. Highly recommended!",
    },
    {
      name: "Robert Brown",
      picture:
        "https://img.freepik.com/free-photo/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes_273609-16608.jpg?semt=ais_hybrid",
      feedback: "Security and real-time tracking are game changers!",
    },
  ];
  return (
    <section className="bg-cyan-100 text-gray-900 py-16 px-6 md:px-12 lg:px-20 mt-10">
      <div className="max-w-4xl mx-auto text-center mb-4">
        <Fade>
        <HeadingWithDes
          heading={"What Our Users Say"}
          description={
            "Hear from our satisfied users who trust our platform for asset management."
          }
        ></HeadingWithDes>
        </Fade>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg text-center border-none"
          >
            <Avatar img={testimonial.picture} alt="avatar of Jese" rounded />
            <p className="text-gray-700 text-sm italic">
              "{testimonial.feedback}"
            </p>
            <h3 className="text-lg font-semibold mt-4 text-gray-900">
              - {testimonial.name}
            </h3>
          </Card>
        ))}
      </div>
        <div className="flex justify-end">
        <Link className="mt-5 rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800" to={"/User-Reviews"}>See All</Link>
        </div>
    </section>
  );
};

export default TestimonialsSection;
