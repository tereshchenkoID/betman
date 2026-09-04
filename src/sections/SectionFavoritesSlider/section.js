'use client'

import { Fragment, useMemo, useRef } from 'react'

import { NAVIGATION, ROUTES_USER } from '@/constant/config'

import { useFavorites } from '@/context/FavoritesContext'
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

const renderSlide = (slide, settings, user) => {
  switch (slide.type) {
    case SLIDE_TYPE.MORE:
      return <ThumbnailMore url={`${NAVIGATION.games_hall.url}/top`} settings={settings} />

    case SLIDE_TYPE.PLACEHOLDER:
      return <ThumbnailPreload />

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
  mock = null,
  settings,
  user,
}) => {
  const blockRef = useRef(null)
  const { favorites, meta } = useFavorites()
  const slideCount = useSlideCount(blockRef, 7)

  const slides = useMemo(() => {
    if (!favorites?.length) return []

    const gameSlides = favorites.map((game, idx) => ({
      type: SLIDE_TYPE.GAME,
      data: game,
      isPriority: idx < 8,
    }))

    let currentLength = gameSlides.length

    if (currentLength < slideCount) {
      gameSlides.push({
        type: SLIDE_TYPE.MORE,
        id: 'placeholder-more',
      })
      currentLength++

      const placeholdersNeeded = slideCount - currentLength
      for (let i = 0; i < placeholdersNeeded; i++) {
        gameSlides.push({
          type: SLIDE_TYPE.PLACEHOLDER,
          id: `placeholder-${i}`,
        })
      }
    }

    return gameSlides
  }, [favorites, slideCount])

  if (meta?.results === '0') return null

  return (
    <div className={style.block} ref={blockRef}>
      <Slider
        slideClassName={style.slide}
        more={{
          isVisible: true,
          to: ROUTES_USER.favourites.url,
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
                renderSlide(
                  el,
                  settings,
                  user,
                  idx
                )
              }
            </Fragment>
          )}
      </Slider>
    </div>
  )
}

export default Section
