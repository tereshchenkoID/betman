'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { startTransition, useEffect, useState } from 'react'
import classNames from 'classnames'

import { NAVIGATION } from '@/constant/config'

import { useWebSocketContext } from '@/context/WebSocketContext'
import { imageError } from '@/helpers/image'

import Icon from '@/components/Icon'
import Badge from '@/modules/Badge'
import Thumbnail from '@/modules/Thumbnails/Thumbnail'
import Slider from '@/modules/Slider'

import style from './index.module.scss'

const JackpotCard = ({
  data,
  user,
  classes = []
}) => {
  const t = useTranslations()
  const { lastMessage } = useWebSocketContext()
  const [games] = useState(() => data?.games || [])
  const [amount, setAmount] = useState(data?.amount)

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
              key={idx}
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
