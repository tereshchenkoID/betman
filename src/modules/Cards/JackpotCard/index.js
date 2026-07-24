'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { startTransition, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useKeenSlider } from 'keen-slider/react'

import { NAVIGATION } from '@/constant/config'

import { useWebSocketContext } from '@/context/WebSocketContext'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Badge from '@/modules/Badge'
import Thumbnail from '@/modules/Thumbnails/Thumbnail'

import style from './index.module.scss'

const JackpotCard = ({
  data,
  user,
  classes = []
}) => {
  const t = useTranslations()
  const { lastMessage } = useWebSocketContext()
  const [jackpot, setJackpot] = useState(data)
  const [isPrevDisabled, setIsPrevDisabled] = useState(true)
  const [isNextDisabled, setIsNextDisabled] = useState(false)

  const isExtended = classes.includes('extended')

  useEffect(() => {
    startTransition(() => {
      setJackpot(data)
    })
  }, [data])

  useEffect(() => {
    if (!lastMessage) return
    const { cmd, data: payload, topic } = lastMessage

    if (cmd === 'update' && topic === 'jackpots') {
      const currentUpdate = payload.find((item) => item.id === jackpot?.id)

      if (currentUpdate) {
        startTransition(() => {
          setJackpot((prev) => {
            if (prev?.amount !== currentUpdate.amount) {
              return {
                ...prev,
                amount: currentUpdate.amount,
              }
            }
            return prev
          })
        })
      }
    }
  }, [lastMessage, jackpot?.id])

  const updateSliderState = (slider) => {
    if (!slider.track?.details) return
    const { rel, maxIdx } = slider.track.details

    setIsPrevDisabled(rel === 0)
    setIsNextDisabled(rel >= maxIdx)
  }

  const [sliderRef, instanceRef] = useKeenSlider({
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
  })

  const handleNext = () => {
    const slider = instanceRef.current
    if (!slider?.track?.details) return

    const { rel, maxIdx } = slider.track.details
    if (rel >= maxIdx) {
      slider.moveToIdx(0)
    } else {
      slider.next()
    }
  }

  const handlePrev = () => {
    const slider = instanceRef.current
    if (!slider?.track?.details) return

    const { rel, maxIdx } = slider.track.details
    if (rel === 0) {
      slider.moveToIdx(maxIdx)
    } else {
      slider.prev()
    }
  }

  return (
    <div
      className={
        classNames(
          style.block,
          classes.map(c => style[c] || c)
        )
      }
      style={{ backgroundImage: 'url(/images/coins.webp)' }}
    >
      <Link
        href={`${NAVIGATION.jackpots.url}/${jackpot?.id}/general`}
        className={style.logo}
        aria-label={jackpot?.title}
      >
        {
          jackpot?.image &&
          <Image
            src={jackpot?.image}
            className={style.image}
            alt={jackpot?.title || 'Jackpot image'}
            fill
            sizes="164px"
            decoding="async"
          />
        }
      </Link>
      <Link
        href={`${NAVIGATION.jackpots.url}/${jackpot?.id}/general`}
        className={style.info}
        aria-label={jackpot?.title}
      >
        {jackpot?.title}
      </Link>
      <Link
        href={`${NAVIGATION.jackpots.url}/${jackpot?.id}/general`}
        className={style.total}
        aria-label={t('jackpot_total')}
      >
        <p className={style.label}>{t('jackpot_total')}</p>
        <div className={style.amount}>
          <h3 className={style.number}>{jackpot?.amount}</h3>
          <h4 className={style.currency}>{jackpot?.currency}</h4>
        </div>
      </Link>
      <Link
        href={`${NAVIGATION.jackpots.url}/${jackpot?.id}/games`}
        className={style.eligible}
        aria-label={t('all_games')}
      >
        <Badge
          data={jackpot?.counter}
          classes={['secondary', 'md', style.badge]}
        />
        <p>{t('all_games')}</p>
        <Icon name="icon-navigation-chevron-right-small" />
      </Link>
      <div className={style.slider}>
        <div className={style.navigation}>
          <Action
            onChange={handlePrev}
            isDisabled={isPrevDisabled}
            classes={['primary', isExtended ? 'md' : 'sm', 'square']}
            aria-label="Previous"
          >
            <Icon name="icon-navigation-chevron-left" />
          </Action>

          <Action
            onChange={handleNext}
            isDisabled={isNextDisabled}
            classes={['primary', isExtended ? 'md' : 'sm', 'square']}
            aria-label="Next"
          >
            <Icon name="icon-navigation-chevron-right" />
          </Action>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {
            jackpot?.games?.map((el, idx) =>
            <div
              key={idx}
              className={style.slide}
            >
              <Thumbnail
                data={el}
                user={user}
                isEmpty={!isExtended}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JackpotCard
