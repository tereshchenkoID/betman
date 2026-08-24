'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'

import { NAVIGATION, ROUTES_USER } from '@/constant/config'
import { useModal } from '@/context/ModalContext'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Logo from '@/modules/Logo'
import FullScreen from '@/modules/FullScreen'
import Favourite from '@/modules/Favorite'
import LoginModal from '@/widgets/Modals/LoginModal'
import Back from '@/modules/Back'
import AccountMenu from '@/modules/AccountMenu'
import Frame from './Frame'

import style from './index.module.scss'

const SectionGame = ({
  user,
  game,
  iframe,
  id,
  mode
}) => {
  const t = useTranslations()
  const router = useRouter()
  const [toggle, setToggle] = useState(false)
  const { openModal } = useModal()

  const handleChange = (value) => {
    if (user?.level === '1' && mode === '1') {
      openModal('verify', { user }, { title: t('verification') })
    }
    else {
      router.push(`${NAVIGATION.game.url}/${id}/${value}`)
    }
  }

  const handleLogin = (e) => {
    if (user?.id) {
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
            <Logo />
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
                  user?.id &&
                  <Action
                    to={ROUTES_USER.wallet.url}
                    classes={['secondary', 'md', 'circle']}
                  >
                    <Icon name={ROUTES_USER.wallet.icon} />
                  </Action>
                }
                <Favourite
                  data={game}
                  user={user}
                  className={'circle'}
                />
              </>
            }
            <FullScreen />
            {
              user?.id &&
              <Action
                classes={['secondary', 'md', 'circle']}
                onChange={(e) => handleLogin(e)}
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
              user={user}
              setToggle={setToggle}
            />
          </div>
        </div>
      }

      <div className={style.wrapper}>
        {
          (mode === '0' && !user?.id)
            ?
              <div className={style.login}>
                <h2 className={style.subtitle}>{t('sign_up')}</h2>
                <LoginModal />
              </div>
            :
              (user?.level === '1' && mode === '0') || !iframe?.iframe
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
