'use client'

import { useTranslations } from 'next-intl'

import ProviderCard from '@/modules/Cards/ProviderCard'
import Empty from '@/modules/Empty'

import style from './index.module.scss'

const SectionPromotions = ({ data, meta }) => {
  const t = useTranslations()

  return (
    <section>
      <h1>{t('section.providers')}</h1>
      {
        meta?.results !== "0"
          ?
            <div className={style.list}>
              {
                data?.map((el, idx) =>
                  <ProviderCard
                    key={idx}
                    data={el}
                    size={'sm'}
                  />
                )
              }
            </div>
          :
            <Empty />
      }
    </section>
  )
}

export default SectionPromotions
