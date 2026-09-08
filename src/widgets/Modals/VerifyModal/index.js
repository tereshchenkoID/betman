import { useTranslations } from 'next-intl'

import { ROUTES_USER } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import Action from '@/components/Action'

import style from './index.module.scss'

const VerifyModal = ({ user }) => {
  const t = useTranslations()
  const { closeModal } = useModal()

  return (
    <div className={style.block}>
      <p>{t('notification.verification_text')}</p>
      <Action
        to={`${ROUTES_USER.profile.url}/${user?.level === '1' ? 'profile' : 'verification'}`}
        onChange={closeModal}
        classes={['tertiary', 'md', 'wide']}
        placeholder={t('notification.verification_button')}
      />
    </div>
  )
}

export default VerifyModal
