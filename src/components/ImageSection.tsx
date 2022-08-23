import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../css/swiper.css';

import {Swiper, SwiperSlide, SwiperProps} from 'swiper/react';
import {EffectCoverflow, Pagination} from "swiper";

function ImageSection() {
  const params: SwiperProps = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: true,
    modules: [EffectCoverflow, Pagination],
    className: 'mySwiper'
  };
  return (
    <div className="text-center text-2xl font-custom pb-16">
      <h1 className="text-4xl font-bold">
        갤러리
      </h1>
      <Swiper {...params}>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Wedding 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="Wedding 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="Wedding 3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ImageSection;
