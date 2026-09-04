import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'
import clsx from 'clsx'

import SectionBanners from '@/sections/SectionBannersSlider'
import SectionBannersSkeleton from '@/sections/SectionBannersSlider/skeleton'
import SectionBigLinks from '@/sections/SectionBigLinksSlider'
import SectionBigLinksSkeleton from '@/sections/SectionBigLinksSlider/skeleton'
import SectionCategories from '@/sections/SectionCategoriesSlider'
import SectionCategoriesSkeleton from '@/sections/SectionCategoriesSlider/skeleton'
import SectionChallenge from '@/sections/SectionChallenge'
import SectionChallengeSkeleton from '@/sections/SectionChallenge/skeleton'
import SectionFavoritesSlider from '@/sections/SectionFavoritesSlider'
import SectionFavoritesSkeleton from '@/sections/SectionFavoritesSlider/skeleton'
import SectionJackpotsSkeleton from '@/sections/SectionJackpotsSlider/skeleton'
import SectionMainBanner from '@/sections/SectionMainBannerSlider'
import SectionMainBannerSkeleton from '@/sections/SectionMainBannerSlider/skeleton'
import SectionWinnersSkeleton from '@/sections/SectionWinnersSlider/skeleton'

import style from './index.module.scss'

import SectionGamesSliderSkeleton from '../SectionGamesSlider/skeleton'

const SectionGamesSlider = dynamic(() => import('../SectionGamesSlider'))
const SectionWinners = dynamic(() => import('../SectionWinnersSlider'))
const SectionJackpots = dynamic(() => import('../SectionJackpotsSlider'))

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
