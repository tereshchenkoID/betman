'use client'

import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import JackpotCard from '@/modules/Cards/JackpotCard'
import Slider from '@/modules/Slider'

import style from './index.module.scss'

const Section = ({ data, meta }) => {
  const t = useTranslations()

  if (meta?.results === '0') return null

  return (
    <Slider
      autoplay
      autoplayInterval={2500}
      className={style.block}
      more={{
        isVisible: true,
        to: NAVIGATION.jackpots.url,
        results: meta?.results || 0
      }}
      title={{
        isVisible: true,
        text: t('section.jackpot'),
      }}
    >
      {
        data?.map((el, idx) =>
          <JackpotCard
            key={el?.id || idx}
            data={el}
            classes={['default']}
          />
        )}
    </Slider>
  )
}

export default Section
