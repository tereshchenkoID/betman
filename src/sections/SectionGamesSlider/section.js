'use client'

import { useMemo, Fragment } from 'react'
import clsx from 'clsx'

import { NAVIGATION } from '@/constant/config'

import Slider from '@/modules/Slider'
import Thumbnail from '@/modules/Cards/Thumbnail'
import ThumbnailMore from '@/modules/Cards/ThumbnailMore'

import style from './index.module.scss'

const SLIDE_TYPE = {
  GAME: 'game',
  MORE: 'more',
}

const renderSlide = (slide, settings, user, moreUrl, idx) => {
  switch (slide.type) {
    case SLIDE_TYPE.MORE:
      return <ThumbnailMore url={moreUrl} settings={settings} />

    case SLIDE_TYPE.GAME:
    default:
      return (
        <>
          {
            slide?.isNumeric &&
            <h2 className={style.index}>{idx + 1}</h2>
          }
          <Thumbnail
            data={slide.data}
            user={user}
            isPriority={slide.isPriority}
            isNumeric={slide?.isNumeric}
          />
        </>
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
      isNumeric: mock?.isNumeric === '1'
    }))

    if (mock?.isNumeric !== '1') {
      gameSlides.push({ type: SLIDE_TYPE.MORE })
    }

    return gameSlides
  }, [data, mock?.isNumeric])

  if (meta?.results === '0') return null

  return (
    <Slider
      className={
        clsx(
          style.block,
          mock?.isNumeric === '1' && style.numeric
        )
      }
      slideClassName={style.slide}
      more={{
        isVisible: true,
        to: moreUrl,
        results: meta?.results
      }}
      title={{
        isVisible: true,
        text: mock?.title
      }}
    >
    {
      slides.map((el, idx) =>
        <Fragment key={el?.id || idx}>
          {
            renderSlide(el, settings, user, moreUrl, idx)
          }
        </Fragment>
      )}
    </Slider>
  )
}

export default Section
