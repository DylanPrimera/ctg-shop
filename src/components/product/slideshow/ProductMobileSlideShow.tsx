"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";
import { ProductImage } from "@/components";


interface Props {
  images: string[];
  title: string;
  customClass?: string;
}

export const ProductMobileSlideShow = ({
  images,
  title,
  customClass,
}: Props) => {

  return (
    <div className={customClass}>
      <Swiper
        style={{
          width: "100%",
          height: "100%",
        }}
        pagination
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
        autoplay={{ delay: 3000 }}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              className="object-fill"
              src={image}
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
