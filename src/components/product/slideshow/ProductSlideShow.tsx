"use client";

import React, { useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import Image from "next/image";


import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  customClass?: string;
}

export const ProductSlideShow = ({ images, title, customClass }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  return (
    <div className={customClass}>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              className="object-fill rounded-lg"
              src={`/products/${image}`}
              alt={title}
              width={1024}
              height={800}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              className="w-full h-full object-fill rounded-lg cursor-pointer"
              src={`/products/${image}`}
              alt={title}
              width={300}
              height={300}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
