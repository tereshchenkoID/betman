'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

import { ROUTES_USER } from '@/constant/config'

import { useModal } from '@/context/ModalContext'
import { fixed } from '@/helpers/fixed'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Logo from '@/modules/Logo'
import Languages from '@/modules/Languages'
import Account from '@/modules/Account'
import AccountMenu from '@/modules/AccountMenu'
import Status from '@/modules/Status'

import style from './index.module.scss'

const Header = ({ user, settings }) => {
  const t = useTranslations()
  const blockRef = useRef(null)
  const { openModal } = useModal()
  const [toggle, setToggle] = useState(false)

  useOutsideClick(
    blockRef,
    () => {
      setToggle(!toggle)
    },
    toggle
  )

  return (
    <header className={style.block}>
      <div className={style.container}>
        <Logo />
        <div
          ref={blockRef}
          className={style.right}
        >
          {
            user?.id &&
            <Link
              href={ROUTES_USER.wallet.url}
              className={style.balance}
              onClick={() => setToggle(false)}
              aria-label={t(ROUTES_USER.wallet.text)}
            >
              <strong>{fixed(user?.credits?.total_balance, 2)}</strong>
              <span> {user?.currency.text}</span>
            </Link>
          }
          <Languages settings={settings} />
          <Action
            classes={['secondary', 'md', 'circle']}
            onChange={() =>
              openModal('search', { user }, { title: t('search'), size: 'lg' })
            }
          >
            <Icon name={'icon-navigation-search'} />
          </Action>
          {
            user?.id
              ?
                <div className={style.avatar}>
                  <Action
                    classes={['secondary', 'md', 'circle']}
                    onChange={() => setToggle(!toggle)}
                  >
                    <Icon name={'icon-human-avatar'} />
                  </Action>
                  {
                    user?.profile?.isVerify !== '3' &&
                    <Status data={user?.profile?.isVerify} />
                  }
                </div>
              :
                <div className={style.account}>
                  <Account />
                </div>
          }
          {
            toggle &&
            <AccountMenu
              user={user}
              setToggle={setToggle}
            />
          }
        </div>
      </div>
    </header>
  )
}

export default Header
