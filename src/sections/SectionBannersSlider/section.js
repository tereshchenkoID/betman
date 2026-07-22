'use client'

import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import classNames from 'classnames'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import BannerCard from '@/modules/Cards/BannerCard'

import style from './index.module.scss'

const SectionBanners = ({ data, meta }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [dotsCount, setDotsCount] = useState(0)
  const [isPrevDisabled, setIsPrevDisabled] = useState(true)
  const [isNextDisabled, setIsNextDisabled] = useState(false)

  const updateSliderState = (slider) => {
    if (!slider.track?.details) return

    const { rel, maxIdx } = slider.track.details

    setCurrentSlide(rel)
    setDotsCount(maxIdx + 1)

    setIsPrevDisabled(rel === 0)
    setIsNextDisabled(rel >= maxIdx)
  }

  const handleDotClick = (idx) => () => {
    instanceRef.current?.moveToIdx(idx)
  }

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: false,
    mode: 'free',
    selector: `.${style.slide}`,
    slides: {
      perView: 'auto',
      origin: 'auto'
    },
    detailsChanged(slider) {
      updateSliderState(slider)
    },
    created(slider) {
      updateSliderState(slider)
    },
    updated(slider) {
      updateSliderState(slider)
    },
  })

  if (meta?.results === '0') return null

  return (
    <div className={style.block}>
      <div className={style.slider}>
        <div className={style.navigation}>
          <Action
            onChange={() => instanceRef.current?.prev()}
            isDisabled={isPrevDisabled}
            classes={['primary', 'md', 'square', style.prev]}
            aria-label="Previous"
          >
            <Icon name="icon-navigation-chevron-left" />
          </Action>

          <Action
            onChange={() => instanceRef.current?.next()}
            isDisabled={isNextDisabled}
            classes={['primary', 'md', 'square', style.next]}
            aria-label="Next"
          >
            <Icon name="icon-navigation-chevron-right" />
          </Action>
        </div>
        <div
          ref={sliderRef}
          className="keen-slider"
        >
          {
            data.map((el, idx) =>
              <div
                key={idx}
                className={style.slide}
              >
                <BannerCard data={el} />
              </div>
          )}
        </div>
      </div>
        <div
          className={
            classNames(
              style.dots,
              {
                [style.hidden]: dotsCount <= 1
              }
            )
          }
        >
          {
            dotsCount > 1 && [...Array(dotsCount).keys()].map((idx) =>
            <button
              key={idx}
              type="button"
              onClick={handleDotClick(idx)}
              className={
                classNames(
                  style.dot,
                  currentSlide === idx ? style.active : ''
                )
              }
              aria-label={`Go to slide ${idx + 1}`}
            />
          )}
        </div>
    </div>
  )
}

export default SectionBanners
