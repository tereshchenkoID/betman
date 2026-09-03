'use client'

import { useTranslations } from 'next-intl'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Empty = () => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      <Icon
        name="navigation-search"
        classes={[style.picture]}
      />
      <p className={style.title}>{t('empty')}</p>
      <p className={style.subtitle}>{t('notification.empty')}</p>
    </div>
  )
}

export default Empty
