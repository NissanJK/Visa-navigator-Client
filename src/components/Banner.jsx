import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Banner = () => {
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
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000 }}
      spaceBetween={30}
      slidesPerView={1}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-[60vh] opacity-75 flex items-center justify-center text-white text-center bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl bg-black bg-opacity-50 font-bold px-8 py-4 rounded-md">
              {slide.title}
            </h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
