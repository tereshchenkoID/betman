'use client'

import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Slider = forwardRef(({
  children,
  options = {},
  plugins = [],
  autoplay = false,
  autoplayInterval = 2500,
  marquee = false,
  animationConfig = { duration: 10000, easing: (t) => t },

  more = {
    isVisible: false,
  },
  navigation = {
    isVisible: true,
    position: 'top',
    size: 'md'
  },
  dots = {
    isVisible: false,
  },
  title = {
    isVisible: false,
  },
  slideClassName,
  className,
}, ref) => {
  const t = useTranslations()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [dotsCount, setDotsCount] = useState(0)
  const [isPrevDisabled, setIsPrevDisabled] = useState(true)
  const [isNextDisabled, setIsNextDisabled] = useState(true)

  const marqueePlugin = (slider) => {
    let isHovered = false

    const nextAnimation = () => {
      if (isHovered || !slider.track?.details) return
      slider.moveToIdx(slider.track.details.abs + 5, true, animationConfig)
    }

    slider.on('created', () => {
      slider.container.addEventListener('mouseenter', () => {
        isHovered = true
        slider.animator.stop()
      })

      slider.container.addEventListener('mouseleave', () => {
        isHovered = false
        nextAnimation()
      })
      nextAnimation()
    })

    slider.on('updated', nextAnimation)
    slider.on('animationEnded', nextAnimation)
  }

  const autoplayPlugin = (slider) => {
    let timeout
    let mouseOver = false

    const clearNextTimeout = () => clearTimeout(timeout)
    const nextTimeout = () => {
      clearTimeout(timeout)
      if (mouseOver) return
      timeout = setTimeout(() => {
        if (!slider.track?.details) return
        const { rel, maxIdx } = slider.track.details
        if (maxIdx === 0) return
        rel >= maxIdx ? slider.moveToIdx(0) : slider.next()
      }, autoplayInterval)
    }

    slider.on('created', () => {
      slider.container.addEventListener('mouseenter', () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.container.addEventListener('mouseleave', () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })
    slider.on('dragStarted', clearNextTimeout)
    slider.on('animationEnded', nextTimeout)
    slider.on('updated', nextTimeout)
  }

  const updateState = (slider) => {
    if (!slider.track?.details) return
    const { rel, maxIdx } = slider.track.details

    setCurrentSlide(rel)
    setDotsCount(maxIdx + 1)
    setIsPrevDisabled(rel === 0)
    setIsNextDisabled(maxIdx === 0 || rel >= maxIdx)
  }

  const activePlugins = [
    ...plugins,
    ...(autoplay ? [autoplayPlugin] : []),
    ...(marquee ? [marqueePlugin] : []),
  ]

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: marquee ? true : (options.loop || false),
      mode: 'free',
      selector: ':scope > .keen-slider__slide, :scope > div',
      slides: { perView: 'auto', origin: 'auto' },
      detailsChanged: updateState,
      created: updateState,
      updated: updateState,
      ...options,
    },
    activePlugins
  )

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update()
    }
  }, [children, instanceRef])

  useImperativeHandle(ref, () => instanceRef.current, [instanceRef])

  return (
    <div
      className={
        classNames(
          style.block,
          style[navigation.size],
          className
        )
      }
    >
      <div className={style.wrapper}>
        <div className={style.header}>
          {
            title.isVisible &&
            <h2 className={style.title}>{title.text}</h2>
          }
          {
            more.isVisible &&
            <Action
              to={more.to}
              classes={['outline', 'md', style.more]}
              placeholder={`${t('more')} (${more.results})`}
            />
          }
          {
            navigation.isVisible &&
            <div
              className={
                classNames(
                  style.navigation,
                  style[navigation.position]
                )
              }
            >
              <Action
                onChange={() => instanceRef.current?.prev()}
                isDisabled={isPrevDisabled}
                classes={['primary', navigation.size, 'square', style.prev]}
                aria-label="Previous"
              >
                <Icon name="icon-navigation-chevron-left" />
              </Action>
              <Action
                onChange={() => instanceRef.current?.next()}
                isDisabled={isNextDisabled}
                classes={['primary', navigation.size, 'square', style.next]}
                aria-label="Next"
              >
                <Icon name="icon-navigation-chevron-right" />
              </Action>
            </div>
          }
        </div>
        <div className={style.slider}>
          <div
            ref={sliderRef}
            className="keen-slider"
          >
            {
              React.Children.toArray(children).map((child, idx) =>
                <div
                  key={idx}
                  className={
                    classNames(
                      style.slide,
                      slideClassName && slideClassName
                    )
                  }
                >
                  {child}
                </div>
              )
            }
          </div>
        </div>
      </div>
      {
        dots?.isVisible && dotsCount > 1 &&
        <div className={style.dots}>
          {[...Array(dotsCount).keys()].map((idx) =>
            <span
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={
                classNames(
                  style.dot,
                  currentSlide === idx && style.active
                )
              }
            />
          )}
        </div>
      }
    </div>
  )
})

Slider.displayName = 'Slider'

export default Slider
