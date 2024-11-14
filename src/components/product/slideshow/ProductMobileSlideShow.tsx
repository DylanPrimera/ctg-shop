"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  customClass?: string;
}

export const ProductMobileSlideShow = ({ images, title, customClass }: Props) => {
  return (
    <div className={customClass}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination
        modules={[FreeMode,Autoplay, Pagination]}
        className="mySwiper2"
        autoplay={{ delay: 3000 }}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              className="object-fill"
              src={`/products/${image}`}
              alt={title}
              width={600}
              height={500}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
