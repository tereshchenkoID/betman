'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { ROUTES_USER } from '@/constant/config'

import { Link } from '@/i18n/navigation'
import { useModal } from '@/context/ModalContext'
import { useGlobalData } from '@/hooks/useGlobalData'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import { mergeCredits } from '@/utils/mergers'
import { fixed } from '@/helpers/fixed'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Account from '@/modules/Account'
import AccountMenu from '@/modules/AccountMenu'
import Languages from '@/modules/Languages'
import Logo from '@/modules/Logo'
import Status from '@/modules/Status'

import style from './index.module.scss'

const Section = ({ user, settings }) => {
  const t = useTranslations()
  const blockRef = useRef(null)
  const { openModal } = useModal()
  const [toggle, setToggle] = useState(null)
  const [credits] = useGlobalData('ws:credits', user?.credits, mergeCredits)

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
            user?.id &&
            <Link
              href={ROUTES_USER.wallet.url}
              className={style.balance}
              onClick={() => setToggle(null)}
              aria-label={t(ROUTES_USER.wallet.text)}
            >
              <strong>{fixed(credits?.total_balance, 2)}</strong>
              <span> {user?.currency.text}</span>
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
              user?.id &&
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
                openModal('search', { user }, { title: t('search'), size: 'lg' })
              }}
            >
              <Icon name="navigation-search" />
            </Action>
            {
              user?.id
                ?
                  <div className={style.avatar}>
                    <Action
                      classes={['secondary', 'md', 'circle']}
                      onChange={() => handleToggle('account')}
                    >
                      <Icon name="human-avatar" />
                    </Action>
                    {
                      user?.level !== '3' &&
                      <Status data={user?.level} />
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
                user={user}
                setToggle={() => setToggle(null)}
              />
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Section
