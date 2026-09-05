import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'
import clsx from 'clsx'

import SectionBanners from '@/sections/SectionBannersSlider'
import SectionBigLinks from '@/sections/SectionBigLinksSlider'
import SectionCategories from '@/sections/SectionCategoriesSlider'
import SectionFavoritesSlider from '@/sections/SectionFavoritesSlider'
import SectionMainBanner from '@/sections/SectionMainBannerSlider'

import SectionBannersSkeleton from '@/sections/SectionBannersSlider/skeleton'
import SectionBigLinksSkeleton from '@/sections/SectionBigLinksSlider/skeleton'
import SectionCategoriesSkeleton from '@/sections/SectionCategoriesSlider/skeleton'
import SectionChallengeSkeleton from '@/sections/SectionChallenge/skeleton'
import SectionFavoritesSkeleton from '@/sections/SectionFavoritesSlider/skeleton'
import SectionGamesSliderSkeleton from '@/sections/SectionGamesSlider/skeleton'
import SectionJackpotsSkeleton from '@/sections/SectionJackpotsSlider/skeleton'
import SectionMainBannerSkeleton from '@/sections/SectionMainBannerSlider/skeleton'
import SectionWinnersSkeleton from '@/sections/SectionWinnersSlider/skeleton'

const SectionGamesSlider = dynamic(() => import('../SectionGamesSlider'))
const SectionWinners = dynamic(() => import('../SectionWinnersSlider'))
const SectionJackpots = dynamic(() => import('../SectionJackpotsSlider'))
const SectionChallenge = dynamic(() => import('../SectionChallenge'))

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

const SectionHome = async ({ skeleton, locale }) => {
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

export default SectionHome
