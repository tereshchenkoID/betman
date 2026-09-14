import { useTranslations } from 'next-intl'

import useModal from '@/hooks/useModal'

import Action from '@/components/Action'

import style from './index.module.scss'

const AgeModal = ({ link }) => {
  const t = useTranslations()
  const { closeModal } = useModal()

  const handleClick = async (e) => {
    e && e.preventDefault()
    localStorage.setItem('age', '1')
    closeModal()
  }

  return (
    <div className={style.block}>
      <div className={style.container}>
        <p>{t('age.text')}</p>
      </div>
      <Action
        type={'submit'}
        classes={['primary', 'lg']}
        placeholder={t('age.button')}
        onChange={handleClick}
      />
      <Action
        to={link || 'https://www.betman.club/over18'}
        classes={['md', 'outline']}
        placeholder={t('age.link')}
      />
    </div>
  )
}

export default AgeModal
