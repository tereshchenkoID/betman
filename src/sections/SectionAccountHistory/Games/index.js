import { useTranslations } from 'next-intl'
import Image from 'next/image'

import clsx from 'clsx'

import { NAVIGATION } from '@/constant/config'

import { date } from '@/helpers/date'
import { fixed } from '@/helpers/fixed'
import { imageError } from '@/helpers/image'

import Action from '@/components/Action'

import style from './index.module.scss'

const Games = ({ user, data }) => {
  const t = useTranslations()

  return (
    <div className={style.table}>
      <div className={style.scroll}>
        <div
          className={
            clsx(
              style.row,
              style.first
            )
          }
        >
          <div className={style.cell}><strong>{t('date_time')}</strong></div>
          <div className={style.cell}><strong>{t('game')}</strong></div>
          <div className={style.cell}><strong>{t('bet')}, {user?.currency?.code}</strong></div>
          <div className={style.cell}><strong>{t('status')}</strong></div>
          <div className={style.cell}><strong>{t('amount')}, {user?.currency?.code}</strong></div>
        </div>
        {
          data?.map((el, idx) =>
            <div
              key={el?.id || idx}
              className={
                clsx(
                  style.row,
                  style[el?.diff[0] === '+' ? 'green' : 'red']
                )
              }
            >
              <div className={style.cell}>{date(el?.dateTime)}</div>
              <div className={style.cell}>
                <div className={style.preview}>
                  <Image
                    src={el?.game?.image}
                    className={style.image}
                    alt={el?.game.title || 'Preview'}
                    width={40}
                    height={40}
                    decoding="async"
                    sizes="40px"
                    onError={(e) => imageError(e, false)}
                    unoptimized
                  />
                </div>
                <Action
                  to={`${NAVIGATION.game.url}/${el?.game.id}/0`}
                  classes={['outline']}
                  placeholder={el?.game.title}
                />
              </div>
              <div className={style.cell}>{el?.amount}</div>
              <div className={style.cell}>
                {t(el?.diff[0] === '+' ? 'win' : 'lose')}
              </div>
              <div className={style.cell}>
                {el?.diff[0] === '+' && '+'}{fixed(el?.diff)}
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Games
