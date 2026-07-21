import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import classNames from 'classnames'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { NAVIGATION } from '@/constant/config'

// import { useWebSocketContext } from 'context/WebSocketProvider'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Badge from '@/modules/Badge'
import Thumbnail from '@/modules/Thumbnails/Thumbnail'

import style from './index.module.scss'

const BREAKPOINTS = {
  320: { slidesPerView: 2 },
  360: { slidesPerView: 3 },
  768: { slidesPerView: 4 },
  992: { slidesPerView: 5 },
  1024: { slidesPerView: 6 },
}

const JackpotCard = ({
  data,
  user,
  classes = []
}) => {
  const t = useTranslations()
  // const { lastMessage } = useWebSocketContext()

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const isExtended = classes.includes('extended')

  // useEffect(() => {
  //   if (!lastMessage) return
  //
  //   const { cmd, data: payload, topic } = lastMessage
  //
  //   if (cmd === 'update' && topic === 'jackpots') {
  //     setData(prev => {
  //       if (Array.isArray(prev)) {
  //         return prev.map(item => {
  //           const updated = payload.find(u => u.id === item.id)
  //           return updated ? { ...item, amount: updated.amount } : item
  //         })
  //       }
  //
  //       const found = payload.find(u => u.id === prev?.id)
  //       return found ? { ...prev, amount: found.amount } : prev
  //     })
  //   }
  // }, [lastMessage, setData])

  // TODO Add socket and update, refactoring styles of sections

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
        href={`${NAVIGATION.jackpots.url}/${data?.id}/general`}
        className={style.logo}
        aria-label={data?.title}
      >
        {
          data?.image &&
          <Image
            src={data?.image}
            className={style.image}
            alt={data?.title || 'Jackpot image'}
            fill
            sizes="164px"
            decoding="async"
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
          <h3 className={style.number}>{data?.amount}</h3>
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
          <Action ref={prevRef} classes={['primary', isExtended ? 'md' : 'sm', 'square', style.prev]}>
            <Icon name="icon-navigation-chevron-left" />
          </Action>
          <Action ref={nextRef} classes={['primary', isExtended ? 'md' : 'sm', 'square', style.next]}>
            <Icon name="icon-navigation-chevron-right" />
          </Action>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={isExtended ? 2 : 3}
          {...(isExtended && {
            breakpoints: BREAKPOINTS,
            observer: true,
            observeParents: true,
            resizeObserver: true,
          })}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }}
        >
          {
            data?.games?.map((game, idx) =>
            <SwiperSlide key={game.id || idx}>
              <Thumbnail
                data={game}
                user={user}
                isEmpty={!isExtended}
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  )
}

export default JackpotCard
