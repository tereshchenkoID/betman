'use client'

import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import Action from '@/components/Action'
import Back from '@/modules/Back'

import style from './index.module.scss'

const SectionNotFound = () => {
  const t = useTranslations()

  return (
    <section className={style.block}>
      <div className={style.header}>
        <Back />
        <h3 className={style.title}>{t('notification.404_link')}</h3>
      </div>
      <div className={style.content}>
        <h1 className={style.subtitle}>404</h1>
        <h2>{t('notification.404_title')}</h2>
        <p>{t('notification.404_text')}</p>
        <Action
          to={NAVIGATION.home.url}
          classes={['secondary', 'lg']}
          placeholder={t('notification.404_button')}
        />
      </div>
    </section>
  )
}

export default SectionNotFound
