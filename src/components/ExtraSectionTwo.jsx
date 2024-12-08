import React from "react";
import { Typewriter } from "react-simple-typewriter";

const ExtraSectionTwo = () => {
  const testimonials = [
    "Visa Navigator made my travel planning so easy! Highly recommended. - Sarah J.",
    "Fast and professional service. Got my visa approved in no time! - John D.",
    "Reliable and efficient visa processing service. - Emma W.",
  ];

  return (
    <div className="w-11/12 mx-auto p-6 text-center bg-gray-300 rounded-lg m-10">
      <h2 className="text-3xl font-black underline underline-offset-2 text-gray-800 mb-10">
        Customer Testimonials
      </h2>
      <p className="text-gray-700 text-lg">
        <Typewriter
          words={testimonials}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </p>
    </div>
  );
};

export default ExtraSectionTwo;
