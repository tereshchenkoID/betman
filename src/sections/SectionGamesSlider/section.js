'use client'

import { useTranslations } from 'next-intl'
import { useState, useMemo } from 'react'
import { useKeenSlider } from 'keen-slider/react'

import { NAVIGATION } from '@/constant/config'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Thumbnail from '@/modules/Thumbnails/Thumbnail'
import ThumbnailEmpty from '@/modules/Thumbnails/ThumbnailEmpty'
import ThumbnailMore from '@/modules/Thumbnails/ThumbnailMore'

import style from './index.module.scss'

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

  const [isPrevDisabled, setIsPrevDisabled] = useState(true)
  const [isNextDisabled, setIsNextDisabled] = useState(false)

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

    return gameSlides
  }, [data])

  const updateSliderState = (slider) => {
    if (!slider.track?.details) return

    const { rel, maxIdx } = slider.track.details

    setIsPrevDisabled(rel === 0)
    setIsNextDisabled(rel >= maxIdx)
  }

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: false,
    mode: 'free',
    selector: `.${style.slide}`,
    slides: {
      perView: 'auto',
      origin: 'auto',
    },
    detailsChanged(slider) {
      updateSliderState(slider)
    },
    created(slider) {
      updateSliderState(slider)
    },
    updated(slider) {
      updateSliderState(slider)
    },
  })

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
          <Action
            onChange={() => instanceRef.current?.prev()}
            isDisabled={isPrevDisabled}
            classes={['primary', 'md', 'square', style.prev]}
            aria-label="Previous"
          >
            <Icon name="icon-navigation-chevron-left" />
          </Action>
          <Action
            onChange={() => instanceRef.current?.next()}
            isDisabled={isNextDisabled}
            classes={['primary', 'md', 'square', style.next]}
            aria-label="Next"
          >
            <Icon name="icon-navigation-chevron-right" />
          </Action>
        </div>
      </div>

      <div className={style.slider}>
        <div
          ref={sliderRef}
          className="keen-slider"
        >
          {
            slides.map((el, idx) =>
            <div
              key={idx}
              className={style.slide}
            >
              {renderSlide(el, settings, user, moreUrl)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Section
