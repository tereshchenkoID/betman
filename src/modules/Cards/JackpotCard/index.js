'use client'

import { startTransition, useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { Link } from '@/i18n/navigation'

import { NAVIGATION } from '@/constant/config'

import { useWebSocketContext } from '@/context/WebSocketContext'
import { imageError } from '@/helpers/image'

import Icon from '@/components/Icon'
import Badge from '@/modules/Badge'
import Thumbnail from '@/modules/Cards/Thumbnail'
import Slider from '@/modules/Slider'

import style from './index.module.scss'

const JackpotCard = ({
  data,
  user,
  classes = []
}) => {
  const t = useTranslations()
  const { lastMessage } = useWebSocketContext()
  const { id, title, image, currency, counter, } = data
  const [games] = useState(() => data?.games || [])
  const [amount, setAmount] = useState(data?.amount)

  const isExtended = classes.includes('extended')

  useEffect(() => {
    startTransition(() => {
      setAmount(data?.amount)
    })
  }, [data?.amount])

  useEffect(() => {
    if (!lastMessage) return
    const { cmd, data: payload, topic } = lastMessage

    if (cmd === 'update' && topic === 'jackpots') {
      const currentUpdate = payload.find((item) => item.id === id)

      if (currentUpdate) {
        startTransition(() => {
          setAmount(prev => (prev === currentUpdate.amount ? prev : currentUpdate.amount))
        })
      }
    }
  }, [id, lastMessage])

  return (
    <article
      className={
        clsx(
          style.block,
          classes?.map(el => style[el] || el)
        )
      }
      style={{ backgroundImage: 'url(/images/coins.webp)' }}
    >
      <Link
        href={`${NAVIGATION.jackpots.url}/${id}/general`}
        className={style.logo}
        aria-label={title}
      >
        {
          image &&
          <Image
            src={image}
            alt={title || 'Jackpot image'}
            fill
            sizes="164px"
            decoding="async"
            onError={imageError}
            unoptimized
          />
        }
      </Link>
      {
        title &&
        <Link
          href={`${NAVIGATION.jackpots.url}/${id}/general`}
          className={style.info}
          aria-label={title}
        >
          {title}
        </Link>
      }
      <Link
        href={`${NAVIGATION.jackpots.url}/${id}/general`}
        className={style.total}
        aria-label={t('jackpot_total')}
      >
        <p className={style.label}>{t('jackpot_total')}</p>
        <div className={style.amount}>
          <h3 className={style.number}>{amount}</h3>
          <h4 className={style.currency}>{currency}</h4>
        </div>
      </Link>
      <Link
        href={`${NAVIGATION.jackpots.url}/${id}/games`}
        className={style.eligible}
        aria-label={t('all_games')}
      >
        <Badge
          data={counter}
          classes={['secondary', 'md', style.badge]}
        />
        <p>{t('all_games')}</p>
        <Icon name="navigation-chevron-right-small" />
      </Link>

      <Slider
        className={style.slider}
        slideClassName={style.slide}
        navigation={{
          isVisible: true,
          position: 'top',
          size: isExtended ? 'md' : 'sm',
        }}
      >
        {
          games?.map((el, idx) =>
            <Thumbnail
              key={el?.id || idx}
              data={el}
              user={user}
              isEmpty={!isExtended}
            />
          )
        }
      </Slider>
    </article>
  )
}

export default JackpotCard
