'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import BigLinkCard from '@/modules/Cards/BigLinkCard'

import style from './index.module.scss'

const Section = ({ data, meta }) => {
  const [sliderRef] = useKeenSlider({
    mode: 'free',
    selector: `.${style.slide}`,
    slides: {
      perView: 'auto',
      origin: 'auto'
    },
  })

  if (meta?.results === '0') return null

  return (
    <div className={style.block}>
      <div ref={sliderRef} className="keen-slider">
        {
          data.map((el, idx) =>
            <div
              key={idx}
              className={style.slide}
            >
              <BigLinkCard data={el} />
            </div>
        )}
      </div>
    </div>
  )
}

export default Section
