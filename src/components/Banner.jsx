import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/6561.jpg_wh860.jpg";
import img2 from "../assets/flat-travel-background-tourism-visa-260nw-279542630.jpg";
import img3 from "../assets/visum-navigator-1920x550-9f1.webp";

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
      // Remove focus from any element in the slider to prevent conflicts
      const activeElement = document.activeElement;
      if (sliderRef.current && sliderRef.current.contains(activeElement)) {
        activeElement.blur();
      }
    },
  };

  const slides = [
    {
      title: "Discover the World with Easy Visas",
      backgroundImage: img1,
    },
    {
      title: "Fast Visa Processing for Over 100 Countries",
      backgroundImage: img2,
    },
    {
      title: "Your Travel Dreams Made Simple",
      backgroundImage: img3,
    },
  ];

  return (
    <div className="w-full h-[60svh]" ref={sliderRef}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-[60svh] flex items-center justify-center text-white text-center bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            tabIndex={index === 0 ? 0 : -1} // Only the first slide is focusable initially
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
