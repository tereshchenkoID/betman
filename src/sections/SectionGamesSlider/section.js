'use client'

import { Fragment, useMemo, useRef } from 'react'
import clsx from 'clsx'

import { NAVIGATION } from '@/constant/config'

import { useSlideCount } from '@/hooks/useSlideCount'

import Thumbnail from '@/modules/Cards/Thumbnail'
import ThumbnailMore from '@/modules/Cards/ThumbnailMore'
import ThumbnailPreload from '@/modules/Cards/ThumbnailPreload'
import Slider from '@/modules/Slider'

import style from './index.module.scss'

const SLIDE_TYPE = {
  GAME: 'game',
  MORE: 'more',
  PLACEHOLDER: 'placeholder',
}

const renderSlide = (slide, settings, user, moreUrl, idx) => {
  switch (slide.type) {
    case SLIDE_TYPE.MORE:
      return <ThumbnailMore url={moreUrl} settings={settings} />

    case SLIDE_TYPE.PLACEHOLDER:
      return <ThumbnailPreload />

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
  const blockRef = useRef(null)
  const pathString = mock?.hasMore?.join('/') || ''
  const slideCount = useSlideCount(blockRef, 7)

  const moreUrl = useMemo(() => {
    return pathString ? `/${pathString}` : `${NAVIGATION.games_hall.url}/top`
  }, [pathString])

  const slides = useMemo(() => {
    if (!data?.length) return []

    const gameSlides = data.map((game, idx) => ({
      type: SLIDE_TYPE.GAME,
      data: game,
      isPriority: idx < 8,
      isNumeric: mock?.isNumeric === '1'
    }))

    let currentLength = gameSlides.length

    if (mock?.isNumeric !== '1') {
      gameSlides.push({
        type: SLIDE_TYPE.MORE,
        id: 'placeholder-more',
      })
      currentLength++

      if (currentLength < slideCount) {
        const placeholdersNeeded = slideCount - currentLength
        for (let i = 0; i < placeholdersNeeded; i++) {
          gameSlides.push({
            type: SLIDE_TYPE.PLACEHOLDER,
            id: `placeholder-${i}`,
          })
        }
      }
    }

    return gameSlides
  }, [data, mock?.isNumeric, slideCount])

  if (meta?.results === '0') return null

  return (
    <div className={style.block} ref={blockRef}>
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
    </div>
  )
}

export default Section
