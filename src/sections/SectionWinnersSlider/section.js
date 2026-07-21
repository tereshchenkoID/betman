'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import WinnerCard from '@/modules/Cards/WinnerCard'

import style from './index.module.scss'

const Section = ({ data, meta, user }) => {
  if (meta?.results === '0') return null

  return (
    <div className={style.block}>
      <div className={style.slider}>
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={4000}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={'auto'}
          spaceBetween={8}
          freeMode={true}
        >
          {
            data?.map((el, idx) =>
              <SwiperSlide key={idx}>
                <WinnerCard
                  data={el}
                  user={user}
                />
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>
    </div>
  )
}

export default Section
