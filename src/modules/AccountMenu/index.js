import { useTranslations } from 'next-intl'
import { startTransition } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import clsx from 'clsx'

import {
  NAVIGATION,
  ROUTES_USER,
} from '@/constant/config'

import { logoutAction } from '@/app/actions/auth'

import { useGlobalData } from '@/hooks/useGlobalData'
import { mergeCredits } from '@/utils/mergers'
import { fixed } from '@/helpers/fixed'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Scale from '@/modules/Scale'
import Status from '@/modules/Status'

import style from './index.module.scss'

const DATA = [
  ROUTES_USER.profile,
  ROUTES_USER.wallet,
  ROUTES_USER.bonuses,
  ROUTES_USER.promocode,
  ROUTES_USER.invite_friends,
  ROUTES_USER.history,
  ROUTES_USER.favourites
]

const AccountMenu = ({ user, setToggle }) => {
  const t = useTranslations()
  const router = useRouter()
  const [credits] = useGlobalData('ws:credits', user?.credits, mergeCredits)

  const handleLogout = async () => {
    setToggle(false)

    await logoutAction().then(() => {
      startTransition(() => {
        router.refresh()
        router.push(NAVIGATION.home.url)
      })
    })
  }

  return (
    <div className={style.block}>
      <div className={style.top}>
        <div className={style.avatar}>
          <Image
            src={user?.profile?.photo || '/images/no_avatar.webp'}
            alt={user?.username}
            priority
            width="40"
            height="40"
            sizes="40px"
            decoding="async"
            unoptimized
          />
          <Status
            data={user?.level}
            classes={['default', 'md']}
          />
        </div>
        <div>
          <Action
            to={ROUTES_USER.profile.url}
            classes={['md', 'outline']}
            onChange={() => setToggle(false)}
          >
            <span>{t('personal_area')}</span>
            <Icon name="navigation-chevron-right" />
          </Action>
          <p className={style.nickname}>{user?.username}</p>
        </div>
      </div>
      <div className={style.center}>
        <div className={style.container}>
          <Link
            href={ROUTES_USER.verification.url}
            className={
              clsx(
                style.level,
                style[`level-${user?.level}`]
              )
            }
            aria-label={t(ROUTES_USER.verification.text)}
            onClick={() => setToggle(false)}
          >
            <Icon name="data-protection" size="lg" />
            <p>
              <span>{t('level.verification')}</span>
              <span>{t(user?.level === '3' ? 'level.verified' : 'level.complete_verification')}</span>
            </p>
            <Icon name="navigation-chevron-right" />
          </Link>
        </div>
        <div className={style.container}>
          <Link
            href={ROUTES_USER.wallet.url}
            className={style.info}
            aria-label={t(ROUTES_USER.wallet.text)}
            onClick={() => setToggle(false)}
          >
            <div className={style.count}>{t('balance')}: <h3>{fixed(credits?.real_balance)}</h3> {user?.currency?.text}</div>
            <Icon name="navigation-chevron-right" />
          </Link>
          <div className={style.actions}>
            <Action
              to={`${ROUTES_USER.wallet.url}/${user?.payements?.[0].alias}/deposit`}
              classes={['brand', 'wide', 'md']}
              placeholder={t('deposit')}
              onChange={() => setToggle(false)}
            />
            <Action
              to={`${ROUTES_USER.wallet.url}/${user?.payements?.[0].alias}/withdrawal`}
              classes={['brand', 'wide', 'md']}
              placeholder={t('withdrawal')}
              onChange={() => setToggle(false)}
            />
          </div>
        </div>
        <div className={style.container}>
          <Link
            href={ROUTES_USER.bonuses.url}
            className={
              clsx(
                style.info,
                style.column
              )
            }
            aria-label={t(ROUTES_USER.bonuses.text)}
            onClick={() => setToggle(false)}
          >
            <div className={style.amount}>
              <div className={style.count}>{t('bonus')}: <h3>{fixed(credits?.bonus?.amount)}</h3> {user?.currency?.text}</div>
              <Icon name="navigation-chevron-right" />
            </div>
            {
              credits?.bonus?.total_bets > 0 &&
              <Scale
                amount={credits?.bonus.total_bets}
                percentage={credits?.bonus.percentage}
                max={credits?.bonus.refund_sum}
                currency={user?.currency?.text}
              />
            }
          </Link>
        </div>
        <menu className={style.container}>
          {
            DATA.map((el, idx) =>
              <Link
                key={idx}
                href={el.url}
                className={style.link}
                onClick={() => setToggle(false)}
                aria-label={t(el.text)}
              >
                <Icon name={el.icon} size="sm" />
                <p className={style.text}>
                  {t(el.text)}
                  {
                    (el.text === ROUTES_USER.profile.text && user?.level !== '3') &&
                    <Status
                      data={user?.level}
                      classes={['sm']}
                    />
                  }
                </p>
                <Icon name="navigation-chevron-right" />
              </Link>
            )
          }
        </menu>
      </div>
      {
        user?.session_type !== 'tma' &&
        <div className={style.bottom}>
          <Action
            classes={['primary', 'wide', 'md']}
            placeholder={t('logout')}
            onChange={handleLogout}
          />
        </div>
      }
    </div>
  )
}

export default AccountMenu
