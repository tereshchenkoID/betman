'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { startTransition, useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import classNames from 'classnames'

import { NAVIGATION } from '@/constant/config'

import { useWebSocketContext } from '@/context/WebSocketContext'
import { imageError } from '@/helpers/image'

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
  const [amount, setAmount] = useState(data?.amount)
  const [isPrevDisabled, setIsPrevDisabled] = useState(true)
  const [isNextDisabled, setIsNextDisabled] = useState(false)

  const isExtended = classes.includes('extended')

  useEffect(() => {
    setAmount(data?.amount)
  }, [data?.amount])

  useEffect(() => {
    if (!lastMessage) return
    const { cmd, data: payload, topic } = lastMessage

    if (cmd === 'update' && topic === 'jackpots') {
      const currentUpdate = payload.find((item) => item.id === data?.id)

      if (currentUpdate) {
        startTransition(() => {
          setAmount(prev => (prev === currentUpdate.amount ? prev : currentUpdate.amount))
        })
      }
    }
  }, [data?.id, lastMessage])

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
    <article
      className={
        classNames(
          style.block,
          classes.map(c => style[c] || c)
        )
      }
      style={{ backgroundImage: 'url(/images/coins.webp)' }}
    >
      <Link
        href={`${NAVIGATION.jackpots.url}/${data?.id}/general`}
        className={style.logo}
        aria-label={data?.title}
      >
        {
          data?.image &&
          <Image
            src={data?.image}
            alt={data?.title || 'Jackpot image'}
            fill
            sizes="164px"
            decoding="async"
            onError={imageError}
          />
        }
      </Link>
      <Link
        href={`${NAVIGATION.jackpots.url}/${data?.id}/general`}
        className={style.info}
        aria-label={data?.title}
      >
        {data?.title}
      </Link>
      <Link
        href={`${NAVIGATION.jackpots.url}/${data?.id}/general`}
        className={style.total}
        aria-label={t('jackpot_total')}
      >
        <p className={style.label}>{t('jackpot_total')}</p>
        <div className={style.amount}>
          <h3 className={style.number}>{amount}</h3>
          <h4 className={style.currency}>{data?.currency}</h4>
        </div>
      </Link>
      <Link
        href={`${NAVIGATION.jackpots.url}/${data?.id}/games`}
        className={style.eligible}
        aria-label={t('all_games')}
      >
        <Badge
          data={data?.counter}
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
            data?.games?.map((el, idx) =>
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
    </article>
  )
}

export default JackpotCard
