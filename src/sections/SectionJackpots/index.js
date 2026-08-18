'use client'

import { useTranslations } from 'next-intl'

import Empty from '@/modules/Empty'
import Title from '@/modules/Title'
import JackpotCard from '@/modules/Cards/JackpotCard'

import style from './index.module.scss'

const SectionJackpots = ({
  data,
  meta,
  user
}) => {
  const t = useTranslations()

  return (
    <section>
      <Title title={t('section.jackpot')} />
      {
        meta?.results !== "0"
          ?
            <div className={style.list}>
              {
                data?.map((el, idx) =>
                  <JackpotCard
                    key={idx}
                    data={el}
                    user={user}
                    classes={['extended']}
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

export default SectionJackpots
