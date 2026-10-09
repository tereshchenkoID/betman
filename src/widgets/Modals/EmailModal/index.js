import { useTranslations } from 'next-intl'

import Action from '@/components/Action'

import style from './index.module.scss'

const EmailModal = ({ data }) => {
  const t = useTranslations()

  const handleReload = () => {
    window.location.href = window.location.pathname
  }

  return (
    <div className={style.block}>
      {
        data?.message &&
        <>
          <p>{data?.message}</p>
          <Action
            classes={['tertiary', 'md', 'wide']}
            placeholder={t('play')}
            onChange={handleReload}
          />
        </>
      }
      {
        data?.error_message &&
        <p>{data?.error_message}</p>
      }
    </div>
  )
}

export default EmailModal
