'use client'

import { useTranslations } from 'next-intl'
import { useMemo, Fragment } from 'react'

import { NAVIGATION } from '@/constant/config'

import { useFavorites } from '@/context/FavoritesContext'

import Slider from '@/modules/Slider'
import Thumbnail from '@/modules/Cards/Thumbnail'
import ThumbnailMore from '@/modules/Cards/ThumbnailMore'

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
  mock = null,
  settings,
  user,
}) => {
  const t = useTranslations()
  const { favorites, meta } = useFavorites()

  const pathString = mock?.hasMore?.join('/') || ''

  const moreUrl = useMemo(() => {
    return pathString ? `/${pathString}` : NAVIGATION.games_hall.url
  }, [pathString])

  const slides = useMemo(() => {
    if (!favorites?.length) return []

    const gameSlides = favorites.map((game, idx) => ({
      type: SLIDE_TYPE.GAME,
      data: game,
      isPriority: idx < 8,
    }))

    if (Number(meta?.results) > 8) {
      gameSlides.push({ type: SLIDE_TYPE.MORE })
    }

    return gameSlides
  }, [favorites, meta?.results])

  if (meta?.results === '0') return null

  return (
    <Slider
      className={style.block}
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
          <Fragment key={idx}>
            {
              renderSlide(el, settings, user, moreUrl, idx)
            }
          </Fragment>
        )}
    </Slider>
  )
}

export default Section
