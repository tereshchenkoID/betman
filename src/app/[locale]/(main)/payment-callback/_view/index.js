'use client'

import { Fragment } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { NAVIGATION, ROUTES_USER } from '@/constant/config'

import { useCopy } from '@/hooks/useCopy'
import { date } from '@/helpers/date'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Section = ({ data }) => {
  const t = useTranslations()
  const { copy, copied } = useCopy()

  if (data.error) return null

  const { payment } = data
  const transaction = JSON.parse(payment?.callback_json)

  return (
    <section>
      <div
        className={
          clsx(
            style.container,
            style[payment?.status]
          )
        }
      >
        <div className={style.icon}>
          <Icon name="status-checkmark" size="xl" />
        </div>
        <h1>{t('notification.payment_successful')}</h1>
        <p>{t('notification.added_to_balance')}</p>
        <br/>
        {
          transaction?.transactions.map((el, _) =>
            <Fragment key={el?.id}>
              <h2>{t('total_credited')}: +{el?.amount} {el?.currency}</h2>
              <p className={style.item}>{t('transaction')}: <strong>{transaction?.id}</strong>
                <Action
                  classes={['secondary', 'md', 'square']}
                  onChange={() => copy(payment?.id)}
                >
                  <Icon name={copied ? 'status-checkmark' : 'actions-copy'} />
                </Action>
              </p>
              <p className={style.item}>{t('card')}: <strong className={style.value}>{transaction?.card?.mask}</strong></p>
              <p className={style.item}>{t('payment_method')}: <strong className={style.value}>{el?.payment_method_brand}</strong></p>
              <p className={style.item}>{t('date_time')}: <strong className={style.value}>{date(el?.updated)}</strong></p>
              <p className={style.item}>{t('status')}: <strong className={style.value}>{el?.status}</strong></p>
            </Fragment>
          )
        }
        <div className={style.actions}>
          <Action
            to={`${NAVIGATION.games_hall.url}/top`}
            classes={['primary', 'lg']}
          >
            {t('notification.start_playing')}
          </Action>
          <Action
            classes={['secondary', 'lg']}
            to={`${ROUTES_USER.wallet.url}`}
          >
            {t('notification.back_to_wallet')}
          </Action>
        </div>
      </div>
    </section>
  )
}

export default Section
