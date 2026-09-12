import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'
import clsx from 'clsx'

import SectionCategories from '@/sections/SectionCategoriesSlider'

import SectionCategoriesSkeleton from '@/sections/SectionCategoriesSlider/_view/skeleton'

import SectionBanners from './SectionBannersSlider'
import SectionBannersSkeleton from './SectionBannersSlider/_view/skeleton'
import SectionBigLinks from './SectionBigLinksSlider'
import SectionBigLinksSkeleton from './SectionBigLinksSlider/_view/skeleton'
import SectionChallengeSkeleton from './SectionChallenge/_view/skeleton'
import SectionFavoritesSlider from './SectionFavoritesSlider'
import SectionFavoritesSkeleton from './SectionFavoritesSlider/_view/skeleton'
import SectionGamesSliderSkeleton from './SectionGamesSlider/_view/skeleton'
import SectionJackpotsSkeleton from './SectionJackpotsSlider/_view/skeleton'
import SectionMainBanner from './SectionMainBannerSlider'
import SectionMainBannerSkeleton from './SectionMainBannerSlider/skeleton'
import SectionWinnersSkeleton from './SectionWinnersSlider/_view/skeleton'

const SectionGamesSlider = dynamic(() => import('./SectionGamesSlider'))
const SectionWinners = dynamic(() => import('./SectionWinnersSlider'))
const SectionJackpots = dynamic(() => import('./SectionJackpotsSlider'))
const SectionChallenge = dynamic(() => import('./SectionChallenge'))

import style from './index.module.scss'

const SECTIONS_CONFIG = {
  games: {
    Component: SectionGamesSlider,
    Fallback: SectionGamesSliderSkeleton,
  },
  winners: {
    Component: SectionWinners,
    Fallback: SectionWinnersSkeleton,
  },
  jackpots: {
    Component: SectionJackpots,
    Fallback: SectionJackpotsSkeleton,
  },
  categories: {
    Component: SectionCategories,
    Fallback: SectionCategoriesSkeleton,
  },
  banners: {
    Component: SectionBanners,
    Fallback: SectionBannersSkeleton,
  },
  favorites: {
    Component: SectionFavoritesSlider,
    Fallback: SectionFavoritesSkeleton,
  },
  challenges: {
    Component: SectionChallenge,
    Fallback: SectionChallengeSkeleton,
  },
  'big-links': {
    Component: SectionBigLinks,
    Fallback: SectionBigLinksSkeleton,
  },
  'main-banner': {
    Component: SectionMainBanner,
    Fallback: SectionMainBannerSkeleton,
  },
}

const SectionWrapper = ({ data }) => {
  const section = SECTIONS_CONFIG[data?.type]

  if (!section) return null

  const { Component, Fallback } = section

  return (
    <section
      className={
        clsx(
          style.block,
          style[data?.type]
        )
      }
    >
      <Suspense fallback={<Fallback />}>
        <Component mock={data} />
      </Suspense>
    </section>
  )
}

const Section = async ({ skeleton, locale }) => {
  const t = await getTranslations({
    locale,
    namespace: 'section',
  })

  return (
    <>
      <h1 className={style.title}>{t('casino')}</h1>
      {
        skeleton?.map((el, idx) =>
        <SectionWrapper
          key={idx}
          data={el}
        />
      )}
    </>
  )
}

export default Section
