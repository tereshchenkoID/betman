'use client'

import { useTranslations } from 'next-intl'

import PromoCard from '@/modules/Cards/PromoCard'
import Empty from '@/modules/Empty'

import style from './index.module.scss'

const SectionPromotions = ({ data, meta }) => {
  const t = useTranslations()

  return (
    <section>
      <h1>{t('section.promo')}</h1>
      {
        meta?.results !== "0"
          ?
            <div className={style.list}>
              {
                data?.map((el, idx) =>
                  <PromoCard
                    key={idx}
                    data={el}
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
