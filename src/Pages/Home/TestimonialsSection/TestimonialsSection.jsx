import React from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import HeaderSection from "../../../Components/HeaderSection/HeaderSection";

const testimonials = [
  {
    name: "John Doe",
    picture:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-501272-1222271.jpg&fm=jpg",
    feedback:
      "This platform has streamlined our asset management!",
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

const TestimonialsSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <Fade triggerOnce>
          <HeaderSection
            title="Real Voices, Real Impact"
            description="Discover how we’ve helped users transform their asset management experience."
          />
        </Fade>
      </div>

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <Fade key={i} delay={i * 150} triggerOnce>
            <div className="relative group bg-gradient-to-tr from-cyan-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-cyan-100 dark:border-gray-700 p-6 shadow-md hover:shadow-xl transition duration-300">
              <div className="absolute -top-6 left-6">
                <img
                  src={t.picture}
                  alt={t.name}
                  className="w-14 h-14 rounded-full ring-4 ring-white dark:ring-gray-900 object-cover"
                />
              </div>
              <div className="pl-20">
                <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-4">
                  “{t.feedback}”
                </p>
                <h4 className="text-gray-900 dark:text-white font-semibold">
                  {t.name}
                </h4>
                <span className="text-xs text-cyan-500">Asset Manager</span>
              </div>
            </div>
          </Fade>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/User-Reviews"
          className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-6 py-2 rounded-full transition"
        >
          Read More Reviews
        </Link>
      </div>
    </section>
  );
};

export default TestimonialsSection;
