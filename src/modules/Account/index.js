import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import Action from '@/components/Action'

import style from './index.module.scss'

const Account = ({ settings, onClose }) => {
  const t = useTranslations()
  const { openModal } = useModal()

  return (
    <div className={style.block}>
      <Action
        classes={['primary', 'md']}
        placeholder={t(NAVIGATION.login.text)}
        onChange={() => {
          onClose()
          openModal('login', {}, { title: t('sign_up') })
        }}
      />
      {
        settings?.modules?.registration !== '0' &&
        <Action
          to={NAVIGATION.registration.url}
          classes={['secondary', 'md']}
          placeholder={t(NAVIGATION.registration.text)}
        />
      }
    </div>
  )
}

export default Account
