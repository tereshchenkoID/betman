'use client'

import { useTranslations } from 'next-intl'

import ProviderCard from '@/modules/Cards/ProviderCard'
import Empty from '@/modules/Empty'
import Title from '@/modules/Title'

import style from './index.module.scss'

const SectionPromotions = ({ data, meta }) => {
  const t = useTranslations()

  return (
    <section>
      <Title
        isBack={true}
        title={t('section.providers')}
      />
      {
        meta?.results !== '0'
          ?
            <div className={style.list}>
              {
                data?.map((el, idx) =>
                  <ProviderCard
                    key={el?.id || idx}
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
