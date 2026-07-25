import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'

import { ROUTES_USER, USER_VERIFY } from '@/constant/config'

import { logoutAction } from '@/app/actions/auth'

import { fixed } from '@/helpers/fixed'
import { consoleHelper } from '@/helpers/console'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Scale from '@/modules/Scale'
import Status from '@/modules/Status'
import Notification from '@/modules/Notification'

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

  const handleLogout = async () => {
    setToggle(false)

    try {
      await logoutAction()
    } catch (e) {
      consoleHelper.error(e)
    } finally {
      window.location.href = '/'
    }
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
            decoding="async"
          />
          <Status
            data={user?.profile?.isVerify}
            size={'md'}
          />
        </div>
        <div>
          <Action
            to={ROUTES_USER.profile.url}
            classes={['md', 'outline']}
            onChange={() => setToggle(false)}
          >
            <span>{t('personal_area')}</span>
            <Icon name={'icon-navigation-chevron-right'} />
          </Action>
          <p className={style.nickname}>{user?.username}</p>
        </div>
      </div>
      <div className={style.center}>
        <Notification
          text={t(`verify_status.${USER_VERIFY[user?.profile?.isVerify]}`)}
          type={user?.profile?.isVerify < 3 ? 'error' : 'success'}
        />
        <div className={style.container}>
          <Link
            href={ROUTES_USER.wallet.url}
            className={style.info}
            aria-label={t(ROUTES_USER.wallet.text)}
            onClick={() => setToggle(false)}
          >
            <div className={style.count}>{t('balance')}: <h3>{fixed(user?.credits?.real_balance)}</h3> {user?.currency?.text}</div>
            <Icon name={'icon-navigation-chevron-right'} />
          </Link>
          <div className={style.actions}>
            <Action
              to={`${ROUTES_USER.wallet.url}/${user?.payements?.[0].alias || 'voucher'}/deposit`}
              classes={['brand', 'wide', 'md']}
              placeholder={t('deposit')}
              onChange={() => setToggle(false)}
            />
            <Action
              to={`${ROUTES_USER.wallet.url}/${user?.payements?.[0].alias || 'voucher'}/withdrawal`}
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
              classNames(
                style.info,
                style.column
              )
            }
            aria-label={t(ROUTES_USER.bonuses.text)}
            onClick={() => setToggle(false)}
          >
            <div className={style.amount}>
              <div className={style.count}>{t('bonus')}: <h3>{fixed(user?.credits?.bonus?.amount)}</h3> {user?.currency?.text}</div>
              <Icon name={'icon-navigation-chevron-right'} />
            </div>
            {
              user?.credits?.bonus?.total_bets > 0 &&
              <Scale
                amount={user?.credits?.bonus.total_bets}
                percentage={user?.credits?.bonus.percentage}
                max={user?.credits?.bonus.refund_sum}
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
                <Icon
                  name={el.icon}
                  size={'sm'}
                />
                <p className={style.text}>
                  {t(el.text)}
                  {
                    (el.text === ROUTES_USER.profile.text && user?.profile?.isVerify !== '3') &&
                    <Status data={user?.profile?.isVerify} />
                  }
                </p>
                <Icon name={'icon-navigation-chevron-right'} />
              </Link>
            )
          }
        </menu>
      </div>
      <div className={style.bottom}>
        <Action
          classes={['primary', 'wide', 'md']}
          placeholder={t('logout')}
          onChange={handleLogout}
        />
      </div>
    </div>
  )
}

export default AccountMenu
