'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import classNames from 'classnames'

import { ROUTES_USER } from '@/constant/config'

import { fixed } from '@/helpers/fixed'

import Icon from '@/components/Icon'
import Action from '@/components/Action'

import style from './index.module.scss'

const MENU = [
  ROUTES_USER.profile,
  ROUTES_USER.history,
  ROUTES_USER.wallet,
  ROUTES_USER.bonuses,
  ROUTES_USER.promocode,
  ROUTES_USER.invite_friends,
  ROUTES_USER.favourites
]

const SectionAccount = ({ user }) => {
  const t = useTranslations()

  return (
    <section className={style.block}>
      <div
        className={
          classNames(
            style.link,
            style.center
          )
        }
      >
        <h2 className={style.subtitle}>{user?.credits?.real_balance} <p className={style.amount}>{user?.currency.text}</p></h2>
        <Action
          to={ROUTES_USER.wallet.url}
          classes={['primary', 'lg']}
          placeholder={t('wallet')}
        />
      </div>
      <div
        className={
          classNames(
            style.link,
            style.center
          )
        }
      >
        <div>
          <h2 className={style.subtitle}>{fixed(user?.credits?.bonus?.amount)} <p className={style.amount}>{user?.currency?.text}</p></h2>
        </div>
        <Action
          to={ROUTES_USER.bonuses.url}
          classes={['primary', 'lg']}
          placeholder={t('bonuses')}
        />
      </div>
      {
        MENU.map((el, idx) =>
          <Link
            key={idx}
            href={el.url}
            className={style.link}
            aria-label={t(el.text)}
          >
            <h2 className={style.subtitle}>{t(el.text)}</h2>
            <div className={style.icon}>
              <Icon name={el.icon} />
            </div>
          </Link>
        )
      }
    </section>
  )
}

export default SectionAccount
