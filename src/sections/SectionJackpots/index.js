'use client'

import { useTranslations } from 'next-intl'

import JackpotCard from '@/modules/Cards/JackpotCard'
import Empty from '@/modules/Empty'
import Title from '@/modules/Title'

import style from './index.module.scss'

const SectionJackpots = ({
  data,
  meta,
  user
}) => {
  const t = useTranslations()

  return (
    <section>
      <Title
        isBack={true}
        title={t('section.jackpot')}
      />
      {
        meta?.results !== '0'
          ?
            <div className={style.list}>
              {
                data?.map((el, idx) =>
                  <JackpotCard
                    key={el?.id || idx}
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
