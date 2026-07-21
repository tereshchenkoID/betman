import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'

import style from './index.module.scss'

import BannersSkeleton from '@/sections/SectionBannersSlider/skeleton'
import SectionWinnersSkeleton from '@/sections/SectionWinnersSlider/skeleton'
import SectionGamesSliderSkeleton from '../SectionGamesSlider/skeleton'
import SectionCategoriesSkeleton from '@/sections/SectionCategoriesSlider/skeleton'
import SectionJackpotsSkeleton from '@/sections/SectionJackpotsSlider/skeleton'
import SectionChallengeSkeleton from '@/sections/SectionChallenge/skeleton'

import SectionCategories from '../SectionCategoriesSlider'
import SectionBanners from '../SectionBannersSlider'
import SectionJackpots from '../SectionJackpotsSlider'
import SectionChallenge from '../SectionChallenge'

const SectionGamesSlider = dynamic(() => import('../SectionGamesSlider'))
const SectionWinners = dynamic(() => import('../SectionWinnersSlider'))

const SECTIONS_CONFIG = {
  categories: {
    Component: SectionCategories,
    Fallback: SectionCategoriesSkeleton,
  },
  banners: {
    Component: SectionBanners,
    Fallback: BannersSkeleton,
  },
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
  challenges: {
    Component: SectionChallenge,
    Fallback: SectionChallengeSkeleton,
  },
}

const SectionWrapper = ({ data }) => {
  const section = SECTIONS_CONFIG[data?.type]

  if (!section) return null

  const { Component, Fallback } = section

  return (
    <section
      className={
        classNames(
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
      <h1>{t('casino')}</h1>
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
