'use client'

import Slider from '@/modules/Slider'
import BannerCard from '@/modules/Cards/BannerCard'

import style from './index.module.scss'

const SectionBanners = ({ data, meta }) => {
  if (meta?.results === '0') return null

  return (
    <Slider
      className={style.block}
      navigation={{
        isVisible: true,
        position: 'center',
        size: 'md'
      }}
      dots={{
        isVisible: true,
      }}
    >
      {
        data.map((el, idx) =>
          <BannerCard
            key={el?.id || idx}
            data={el}
          />
        )
      }
    </Slider>
  )
}

export default SectionBanners
