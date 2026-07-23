import { useTranslations } from 'next-intl'

import { useModal } from '@/context/ModalContext'

import Action from '@/components/Action'

import style from './index.module.scss'

const AgeModal = () => {
  const t = useTranslations()
  const { closeModal } = useModal()

  const handleSubmit = async (e) => {
    e && e.preventDefault()
    sessionStorage.setItem('age', '1')
    closeModal()
  }

  return (
    <form
      className={style.block}
      onSubmit={handleSubmit}
    >
      <div className={style.container}>
        <p>{t('age.text')}</p>
      </div>
      <Action
        type={'submit'}
        classes={['primary', 'lg']}
        placeholder={t('age.button')}
      />
      <Action
        to={'https://www.betman.club/over18'}
        classes={['md', 'outline']}
        placeholder={t('age.link')}
      />
    </form>
  )
}

export default AgeModal
