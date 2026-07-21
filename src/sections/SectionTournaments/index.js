'use client'

import { useTranslations } from 'next-intl'

import style from './index.module.scss'

const SectionTournaments = ({ data, meta }) => {
  const t = useTranslations()

  return (
    <section>
      <h1>{t('section.tournaments')}</h1>
      <p>{t('notification.tournaments_empty')}</p>
    </section>
  )
}

export default SectionTournaments
