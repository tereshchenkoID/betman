'use client'

import { useTranslations } from 'next-intl'

import Title from '@/modules/Title'

const SectionTournaments = ({ data, meta }) => {
  const t = useTranslations()

  return (
    <section>
      <Title title={t('section.tournaments')} />
      <p>{t('notification.tournaments_empty')}</p>
    </section>
  )
}

export default SectionTournaments
