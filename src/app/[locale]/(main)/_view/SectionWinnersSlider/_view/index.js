'use client'

import WinnerCard from '@/modules/Cards/WinnerCard'
import Slider from '@/modules/Slider'

import style from './index.module.scss'

const Section = ({ data, meta, mock }) => {
  if (meta?.results === '0' || meta?.results < 5) return null

  return (
    <Slider
      className={style.block}
      marquee={true}
      navigation={{
        isVisible: false,
      }}
      title={{
        isVisible: true,
        text: mock?.title,
      }}
    >
      {
        data?.map((el, idx) =>
          <WinnerCard
            key={el?.id || idx}
            data={el}
          />
        )}
    </Slider>
  )
}

export default Section
