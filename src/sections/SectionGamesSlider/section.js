'use client'

import { useTranslations } from 'next-intl'
import { useRef, useState, useMemo } from 'react'

import { NAVIGATION } from '@/constant/config'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Thumbnail from '@/modules/Thumbnails/Thumbnail'
import ThumbnailEmpty from '@/modules/Thumbnails/ThumbnailEmpty'
import ThumbnailMore from '@/modules/Thumbnails/ThumbnailMore'

import style from './index.module.scss'

const BREAKPOINTS = {
  320: { slidesPerView: 2 },
  360: { slidesPerView: 3 },
  768: { slidesPerView: 4 },
  992: { slidesPerView: 5 },
  1024: { slidesPerView: 6 },
}

const SLIDE_TYPE = {
  GAME: 'game',
  MORE: 'more',
  PLACEHOLDER: 'placeholder',
}

const renderSlide = (slide, settings, user, moreUrl) => {
  switch (slide.type) {
    case SLIDE_TYPE.MORE:
      return <ThumbnailMore url={moreUrl} settings={settings} />

    case SLIDE_TYPE.PLACEHOLDER:
      return <ThumbnailEmpty settings={settings} />

    case SLIDE_TYPE.GAME:
    default:
      return (
        <Thumbnail
          data={slide.data}
          user={user}
          isPriority={slide.isPriority}
        />
      )
  }
}

const Section = ({
  data,
  meta,
  mock = null,
  settings,
  user,
}) => {
  const t = useTranslations()
  const [slidesPerView, setSlidesPerView] = useState(7)

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const pathString = mock?.hasMore?.join('/') || ''

  const moreUrl = useMemo(() => {
    return pathString ? `/${pathString}` : NAVIGATION.games_hall.url
  }, [pathString])

  const slides = useMemo(() => {
    if (!data?.length) return []

    const gameSlides = data.map((game, idx) => ({
      type: SLIDE_TYPE.GAME,
      data: game,
      isPriority: idx < 8,
    }))

    gameSlides.push({ type: SLIDE_TYPE.MORE })

    if (gameSlides.length < slidesPerView) {
      const placeholdersCount = slidesPerView - gameSlides.length
      const placeholders = Array.from({ length: placeholdersCount }, () => ({
        type: SLIDE_TYPE.PLACEHOLDER,
      }))
      return [...gameSlides, ...placeholders]
    }

    return gameSlides
  }, [data, slidesPerView])

  if (meta?.results === '0') return null

  return (
    <div className={style.block}>
      <div className={style.header}>
        <h2 className={style.title}>{mock?.title}</h2>
        {
          mock?.hasMore?.length > 0 &&
          <Action
            to={moreUrl}
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
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={2}
          breakpoints={BREAKPOINTS}
          navigation
          observer
          observeParents
          resizeObserver
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }}
          onInit={(swiper) => {
            setSlidesPerView(swiper.params.slidesPerView)
          }}
          onBreakpoint={(swiper) => {
            setSlidesPerView(swiper.params.slidesPerView)
          }}
        >
          {
            slides.map((el, idx) =>
            <SwiperSlide key={el.data?.id || idx}>
              {renderSlide(el, settings, user, moreUrl)}
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  )
}

export default Section
