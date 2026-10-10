import { useTranslations } from 'next-intl'

import { APPLICATION_TYPE, ROUTES_USER } from '@/constant/config'

import useModal from '@/hooks/useModal'
import { useUser } from '@/hooks/useUser'

import Action from '@/components/Action'

import style from './index.module.scss'

const AgeModal = ({ link }) => {
  const t = useTranslations()
  const { closeModal } = useModal()
  const { session } = useUser()

  const handleClick = async () => {
    localStorage.setItem('age', '1')
    closeModal()
  }

  const handleClose = () => {
    if (session === APPLICATION_TYPE.telegram) {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.close()
      }
    }
    else {
      window.location.href = link || 'https://www.betman.club/over18'
    }
  }

  return (
    <div className={style.block}>
      <div className={style.container}>
        <p>{t('age.text')}</p>
      </div>
      {
        session === APPLICATION_TYPE.telegram
          ?
            <Action
              to={`${ROUTES_USER.profile.url}/general`}
              classes={['primary', 'lg']}
              placeholder={t('age.complete_profile')}
              onChange={handleClick}
            />
          :
            <Action
              classes={['primary', 'lg']}
              placeholder={t('age.button')}
              onChange={handleClick}
            />
      }
      <Action
        classes={['md', 'outline']}
        placeholder={t('age.link')}
        onChange={handleClose}
      />
    </div>
  )
}

export default AgeModal
