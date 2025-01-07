import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: () => {
      const activeElement = document.activeElement;
      if (sliderRef.current && sliderRef.current.contains(activeElement)) {
        activeElement.blur();
      }
    },
  };

  const slides = [
    {
      title: "Discover the World with Easy Visas",
      backgroundImage:
        "https://img.freepik.com/free-photo/top-view-tourist-objects-frame-with-copy-space_23-2148786099.jpg",
    },
    {
      title: "Fast Visa Processing for Over 100 Countries",
      backgroundImage:
        "https://img.freepik.com/free-photo/american-visa-document_1101-820.jpg",
    },
    {
      title: "Your Travel Dreams Made Simple",
      backgroundImage:
        "https://img.freepik.com/free-vector/visa-stamping-illustration_1284-52334.jpg?t=st=1736250164~exp=1736253764~hmac=53446c18a368455ca23f3a72c4476ad4305e9ffd0534449e39fca91257d3c632&w=740",
    },
  ];

  return (
    <div className="w-full h-[60svh]" ref={sliderRef}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-[60svh] flex items-center justify-center text-white text-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.backgroundImage})`, // Set the background image
            }}
          >
            <h2 className="text-4xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md">
              {slide.title}
            </h2>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
