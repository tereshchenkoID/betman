'use client'

import { useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import BannerCard from '@/modules/Cards/BannerCard'

import style from './index.module.scss'

const SectionBanners = ({ data, meta }) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  if (meta?.results === '0') return null

  return (
    <div className={style.block}>
      <div className={style.slider}>
        <div className={style.navigation}>
          <Action
            ref={prevRef}
            classes={['primary', 'md', 'square', style.prev]}
            aria-label="Previous"
          >
            <Icon name="icon-navigation-chevron-left" />
          </Action>
          <Action
            ref={nextRef}
            classes={['primary', 'md', 'square', style.next]}
            aria-label="Next"
          >
            <Icon name="icon-navigation-chevron-right" />
          </Action>
        </div>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={8}
          pagination={{
            clickable: true,
          }}
          mousewheel={true}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }}
          modules={[Pagination, Navigation, FreeMode]}
        >
          {
            data?.map((el, idx) =>
              <SwiperSlide key={idx}>
                <BannerCard data={el} />
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>
    </div>
  )
}

export default SectionBanners
