'use client'

import {startTransition, useEffect, useState} from 'react'
import { useTranslations } from 'next-intl'
import { useKeenSlider } from 'keen-slider/react'

import { NAVIGATION } from '@/constant/config'

import { useWebSocketContext } from '@/context/WebSocketContext'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import JackpotCard from '@/modules/Cards/JackpotCard'

import style from './index.module.scss'

const SectionJackpots = ({
  data,
  meta,
  mock = null,
  user
}) => {
  const t = useTranslations()
  const { lastMessage } = useWebSocketContext()
  const [jackpots, setJackpots] = useState(data)

  const [isPrevDisabled, setIsPrevDisabled] = useState(true)
  const [isNextDisabled, setIsNextDisabled] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setJackpots(data)
    })
  }, [data])

  useEffect(() => {
    if (!lastMessage) return
    const { cmd, data: payload, topic } = lastMessage

    if (cmd === 'update' && topic === 'jackpots') {
      const updatesMap = new Map(payload.map((item) => [String(item.id), item.amount]))

      startTransition(() => {
        setJackpots((prev) =>
          prev.map((jackpot) => {
            const amount = updatesMap.get(String(jackpot.id))
            if (amount !== jackpot.amount) {
              return {...jackpot, amount: amount}
            }

            return jackpot
          })
        )
      })
    }
  }, [lastMessage])

  const updateSliderState = (slider) => {
    if (!slider.track?.details) return
    const { rel, maxIdx } = slider.track.details

    setIsPrevDisabled(rel === 0)
    setIsNextDisabled(rel >= maxIdx)
  }

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: false,
      mode: 'free',
      selector: `.${style.slide}`,
      slides: {
        perView: 'auto',
        origin: 'auto',
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
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false

        function clearNextTimeout() {
          clearTimeout(timeout)
        }

        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return

          timeout = setTimeout(() => {
            if (!slider.track?.details) return

            const { rel, maxIdx } = slider.track.details

            if (maxIdx === 0) return

            if (rel >= maxIdx) {
              slider.moveToIdx(0)
            } else {
              slider.next()
            }
          }, 2500)
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
      },
    ]
  )

  const handleNext = () => {
    const slider = instanceRef.current
    if (slider && slider.track?.details && slider.track.details.maxIdx > 0) {
      slider.next()
    }
  }

  const handlePrev = () => {
    const slider = instanceRef.current
    if (slider && slider.track?.details) {
      slider.prev()
    }
  }

  if (meta?.results === '0') return null

  return (
    <div className={style.block}>
      <div className={style.header}>
        <h2 className={style.title}>{mock?.title}</h2>
        {
          meta?.results &&
          <Action
            to={NAVIGATION.jackpots.url}
            classes={['outline', 'md', style.more]}
            placeholder={`${t('more')} (${meta?.results})`}
          />
        }
        <div className={style.navigation}>
          <Action
            onChange={handlePrev}
            isDisabled={isPrevDisabled}
            classes={['primary', 'md', 'square', style.prev]}
            aria-label="Previous"
          >
            <Icon name="icon-navigation-chevron-left" />
          </Action>
          <Action
            onChange={handleNext}
            isDisabled={isNextDisabled}
            classes={['primary', 'md', 'square', style.next]}
            aria-label="Next"
          >
            <Icon name="icon-navigation-chevron-right" />
          </Action>
        </div>
      </div>

      <div className={style.slider}>
        <div ref={sliderRef} className="keen-slider">
          {
            jackpots?.map((el, idx) =>
              <div
                key={idx}
                className={style.slide}
              >
                <JackpotCard
                  data={el}
                  classes={['default']}
                  user={user}
                />
              </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SectionJackpots
