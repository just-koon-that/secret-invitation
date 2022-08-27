import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../css/swiper.css';

import {Swiper, SwiperSlide, SwiperProps} from 'swiper/react';
import {EffectCoverflow, Pagination} from 'swiper';
import {AWS_CDN_URL} from '../constants';



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
    <div className="text-center text-2xl font-custom mb-32">
      <h1 className="text-4xl font-bold">
        갤러리
      </h1>
      <Swiper {...params}>
        {new Array(18).fill('').map((_, i) => (
          <SwiperSlide key={i}>
            <img src={`${AWS_CDN_URL}/gallery/${i + 1}.jpg`} alt="Wedding" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSection;
