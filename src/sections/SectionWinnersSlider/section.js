'use client'

import { useRef } from 'react'
import { useKeenSlider } from 'keen-slider/react'

import WinnerCard from '@/modules/Cards/WinnerCard'

import style from './index.module.scss'

const ANIMATION_CONFIG = {
  duration: 10000,
  easing: (t) => t
}

const Section = ({ data, meta, user }) => {
  const isHovered = useRef(false)

  const nextAnimation = (slider) => {
    if (isHovered.current) return
    slider.moveToIdx(slider.track.details.abs + 5, true, ANIMATION_CONFIG)
  }

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    selector: `.${style.slide}`,
    slides: {
      perView: 'auto',
      origin: 'auto'
    },
    created(s) {
      nextAnimation(s)
    },
    updated(s) {
      nextAnimation(s)
    },
    animationEnded(s) {
      nextAnimation(s)
    },
  })

  const handleMouseEnter = () => {
    isHovered.current = true
    instanceRef.current?.animator.stop()
  }

  const handleMouseLeave = () => {
    isHovered.current = false
    if (instanceRef.current) {
      nextAnimation(instanceRef.current)
    }
  }

  if (meta?.results === '0') return null

  return (
    <div className={style.block}>
      <div
        className={style.slider}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={sliderRef}
          className="keen-slider"
        >
          {
            data?.map((el, idx) =>
            <div
              key={idx}
              className={style.slide}
            >
              <WinnerCard
                data={el}
                user={user}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Section
