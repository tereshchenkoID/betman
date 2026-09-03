'use client'

import Slider from '@/modules/Slider'
import BigLinkCard from '@/modules/Cards/BigLinkCard'

import style from './index.module.scss'

const Section = ({ data, meta }) => {
  if (meta?.results === '0') return null

  return (
    <Slider
      className={style.block}
      navigation={{
        isVisible: true,
        position: 'right',
        size: 'md'
      }}
    >
      {
        data.map((el, idx) =>
          <BigLinkCard
            key={el?.id || idx}
            data={el}
          />
        )}
    </Slider>
  )
}

export default Section
