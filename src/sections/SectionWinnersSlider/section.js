'use client'

import WinnerCard from '@/modules/Cards/WinnerCard'

import Slider from '@/modules/Slider'

import style from './index.module.scss'

const Section = ({ data, meta, user }) => {
  if (meta?.results === '0' || meta?.results < 10) return null

  return (
    <Slider
      className={style.block}
      marquee={true}
      navigation={{
        isVisible: false,
      }}
    >
      {
        data?.map((el, idx) =>
          <WinnerCard
            key={el?.id || idx}
            data={el}
            user={user}
          />
        )}
    </Slider>
  )
}

export default Section
