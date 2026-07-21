'use client'

import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode, Autoplay } from 'swiper/modules'

import { NAVIGATION } from '@/constant/config'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import JackpotCard from '@/modules/Cards/JackpotCard'

import style from './index.module.scss'

const SectionJackpots = ({
  data,
  meta,
  mock = null,
  user
}) => {
  const t = useTranslations()
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  if (meta?.results === '0') return null

  return (
    <div className={style.block}>
      <div className={style.header}>
        <h2 className={style.title}>{mock?.title}</h2>
        {
          meta?.results &&
          <Action
            to={NAVIGATION.jackpots.url}
            classes={['outline', 'md', style.more]}
            placeholder={`${t('more')} (${meta?.results})`}
          />
        }
        <div className={style.navigation}>
          <Action ref={prevRef} classes={['primary', 'md', 'square', style.prev]}>
            <Icon name="icon-navigation-chevron-left" />
          </Action>

          <Action ref={nextRef} classes={['primary', 'md', 'square', style.next]}>
            <Icon name="icon-navigation-chevron-right" />
          </Action>
        </div>
      </div>
      <div className={style.slider}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={8}
          freeMode
          modules={[Navigation, FreeMode, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }}
        >
          {
            data?.map((el, idx) =>
              <SwiperSlide key={idx}>
                <JackpotCard
                  data={el}
                  classes={['default']}
                  user={user}
                />
              </SwiperSlide>
            )}
        </Swiper>
      </div>
    </div>
  )
}

export default SectionJackpots
