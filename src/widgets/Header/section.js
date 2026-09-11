'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { ROUTES_USER } from '@/constant/config'

import useModal from '@/hooks/useModal'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useUser } from '@/hooks/useUser'
import { fixed } from '@/helpers/fixed'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Account from '@/modules/Account'
import AccountMenu from '@/modules/AccountMenu'
import Languages from '@/modules/Languages'
import Logo from '@/modules/Logo'
import Status from '@/modules/Status'

import style from './index.module.scss'

const Section = ({ settings, bonuses }) => {
  const t = useTranslations()
  const blockRef = useRef(null)

  const { level, currency, credits, isAuth } = useUser()

  const { openModal } = useModal()
  const [toggle, setToggle] = useState(null)

  const handleToggle = (data) => {
    setToggle((prev) => (prev === data ? null : data))
  }

  useOutsideClick(
    blockRef,
    () => {
      setToggle(null)
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
            isAuth &&
            <Link
              href={ROUTES_USER.wallet.url}
              className={style.balance}
              onClick={() => setToggle(null)}
              aria-label={t(ROUTES_USER.wallet.text)}
            >
              <strong>{fixed(credits?.total_balance, 2)}</strong>
              <span> {currency?.text}</span>
            </Link>
          }
          <div className={style.wrapper}>
            <Languages
              settings={settings}
              isOpen={toggle === 'languages'}
              onToggle={() => handleToggle('languages')}
              onClose={() => setToggle(null)}
            />
            {
              isAuth &&
              <Action
                to={ROUTES_USER.wallet.url}
                classes={['secondary', 'md', 'circle']}
              >
                <Icon name={ROUTES_USER.wallet.icon} />
              </Action>
            }
            <Action
              classes={['secondary', 'md', 'circle']}
              onChange={() => {
                setToggle(null)
                openModal('search', { }, { title: t('search'), size: 'lg' })
              }}
            >
              <Icon name="navigation-search" />
            </Action>
            {
              isAuth
                ?
                  <div className={style.avatar}>
                    <Action
                      classes={['secondary', 'md', 'circle']}
                      onChange={() => handleToggle('account')}
                    >
                      <Icon name="human-avatar" />
                    </Action>
                    {
                      level !== '3' &&
                      <Status data={level} />
                    }
                  </div>
                :
                  <div className={style.account}>
                    <Account
                      settings={settings}
                      onClose={() => setToggle(null)}
                    />
                  </div>
            }
            {
              toggle === 'account' &&
              <AccountMenu
                setToggle={() => setToggle(null)}
                bonuses={bonuses}
              />
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Section
