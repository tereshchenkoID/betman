'use client'

import { useTranslations } from 'next-intl'

import PromoCard from '@/modules/Cards/PromoCard'
import Empty from '@/modules/Empty'
import Title from '@/modules/Title'

import style from './index.module.scss'

const SectionPromotions = ({ data, meta }) => {
  const t = useTranslations()

  return (
    <section>
      <Title
        isBack={true}
        title={t('section.promo')}
      />
      {
        meta?.results !== "0"
          ?
            <div className={style.list}>
              {
                data?.map((el, idx) =>
                  <PromoCard
                    key={el?.id || idx}
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
