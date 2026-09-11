'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link, useRouter } from '@/i18n/navigation'

import { NAVIGATION, ROUTES_USER } from '@/constant/config'

import useModal from '@/hooks/useModal'
import { useUser } from '@/hooks/useUser'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import AccountMenu from '@/modules/AccountMenu'
import Back from '@/modules/Back'
import Favorite from '@/modules/Favorite'
import FullScreen from '@/modules/FullScreen'
import LoginModal from '@/widgets/Modals/LoginModal'

import Frame from './Frame'

import style from './index.module.scss'

const SectionGame = ({
  game,
  iframe,
  id,
  mode,
  bonuses
}) => {
  const t = useTranslations()
  const router = useRouter()
  const { isAuth, level, session } = useUser()
  const [toggle, setToggle] = useState(false)
  const { openModal } = useModal()

  const handleChange = (value) => {
    if (level === '1' && mode === '1') {
      openModal('verify', { }, { title: t('verification') })
    }
    else {
      router.push(`${NAVIGATION.game.url}/${id}/${value}`)
    }
  }

  const handleLogin = (e) => {
    if (isAuth) {
      e.stopPropagation()
      setToggle(prev => !prev)
    }
  }

  return (
    <section className={style.block}>
      <div
        className={style.header}
        onClick={() => setToggle(false)}
      >
        <div className={style.container}>
          <div className={style.options}>
            <Back />
            <Link
              href={NAVIGATION.home.url}
              rel="noreferrer"
              className={style.logo}
              aria-label="Logo"
            >
              <Image
                src="/images/logo/logo-desktop.svg"
                width={140}
                height={34}
                alt="Logo"
                loading="eager"
                unoptimized
                priority
              />
            </Link>
          </div>
          <div className={style.options}>
            {
              mode === '1' &&
              <Action
                classes={['secondary', 'md']}
                placeholder={t('real')}
                onChange={() => handleChange('0')}
              />
            }
            {
              game &&
              <>
                {
                  isAuth &&
                  <Action
                    to={ROUTES_USER.wallet.url}
                    classes={['secondary', 'md', 'circle']}
                  >
                    <Icon name={ROUTES_USER.wallet.icon} />
                  </Action>
                }
                <Favorite
                  data={game}
                  className={'circle'}
                />
              </>
            }
            {
              session !== 'tma' &&
              <FullScreen />
            }
            {
              isAuth &&
              <Action
                classes={['secondary', 'md', 'circle']}
                onChange={handleLogin}
              >
                <Icon name="human-avatar" />
              </Action>
            }
          </div>
        </div>
      </div>

      {
        toggle &&
        <div
          className={style.overlay}
          onClick={() => setToggle(false)}
        >
          <div
            className={style.menu}
            onClick={(e) => e.stopPropagation()}
          >
            <AccountMenu
              setToggle={setToggle}
              bonuses={bonuses}
            />
          </div>
        </div>
      }

      <div className={style.wrapper}>
        {
          (mode === '0' && !isAuth)
            ?
              <div className={style.login}>
                <h2 className={style.subtitle}>{t('sign_up')}</h2>
                <LoginModal />
              </div>
            :
              (level === '1' && mode === '0') || !iframe?.iframe
                ?
                  <div className={style.error}>{t('notification.game_empty')}</div>
                :
                  <Frame
                    src={iframe?.iframe}
                    title={String(id)}
                  />
        }
      </div>
    </section>
  )
}

export default SectionGame
