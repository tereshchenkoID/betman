'use client'

import { useTranslations } from 'next-intl'

import QuestCard from '@/modules/Cards/QuestCard'
import Empty from '@/modules/Empty'
import Title from '@/modules/Title'

import style from './index.module.scss'

const SectionQuests = ({ data, meta }) => {
  const t = useTranslations()

  return (
    <section>
      <Title title={t('section.quests')} />
      {
        meta?.results !== "0"
          ?
            <div className={style.list}>
              {
                data?.map((el, idx) =>
                  <QuestCard
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

export default SectionQuests
