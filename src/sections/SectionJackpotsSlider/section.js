'use client'
import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import JackpotCard from '@/modules/Cards/JackpotCard'
import Slider from '@/modules/Slider'

import style from './index.module.scss'

const SectionJackpots = ({
  data,
  meta,
  user
}) => {
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
        results: meta?.results
      }}
      title={{
        isVisible: true,
        text: t('section.jackpot'),
      }}
    >
      {
        data?.map((el, idx) =>
          <JackpotCard
            key={idx}
            data={el}
            classes={['default']}
            user={user}
          />
        )}
    </Slider>
  )
}

export default SectionJackpots
