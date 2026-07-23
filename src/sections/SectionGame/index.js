'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'

import { NAVIGATION } from '@/constant/config'

import Logo from '@/modules/Logo'
import Icon from '@/components/Icon'
import Action from '@/components/Action'
import FullScreen from '@/modules/FullScreen'
import Favourite from '@/modules/Favorite'
import LoginModal from '@/modules/Modals/LoginModal'
import Checked from '@/modules/Checked'
import Back from '@/modules/Back'
// import AccountMenu from '@/modules/AccountMenu'

import style from './index.module.scss'

const SectionGame = ({
  user,
  settings,
  game,
  iframe,
  id,
  mode
}) => {
  const t = useTranslations()
  const router = useRouter()
  const [toggle, setToggle] = useState(false)

  const handleChange = (value) => {
    router.push(`${NAVIGATION.game.url}/${id}/${value}`)
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
            <Back url={NAVIGATION.home.url} />
            <Logo settings={settings} />
          </div>
          <div className={style.options}>
            <Checked
              data={mode}
              onChange={handleChange}
              placeholder={[t('real'), t('demo')]}
            />
            {
              game &&
              <Favourite data={game} />
            }
            <FullScreen />
            {
              user?.id &&
              <Action
                classes={['secondary', 'md', 'circle']}
                onChange={(e) => handleLogin(e)}
              >
                <Icon name={'icon-human-avatar'} />
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
            {/*<AccountMenu setToggle={setToggle} />*/}
          </div>
        </div>
      }

      <div className={style.wrapper}>
        {
          (mode === '0' && !user?.id)
            ?
              <div className={style.login}>
                <h2 className={style.subtitle}>{t('sign_up')}</h2>
                <LoginModal isRedirect={false} />
              </div>
            :
              !iframe?.iframe
                ?
                  <div className={style.error}>{t('notification.game_empty')}</div>
                :
                  <div className={style.game}>
                    <iframe
                      className={style.iframe}
                      src={iframe?.iframe}
                      frameBorder="0"
                      scrolling="auto"
                      title={String(id)}
                      allow="autoplay *; screen-wake-lock *; fullscreen *"
                    />
                  </div>
              }
      </div>
    </section>
  )
}

export default SectionGame
