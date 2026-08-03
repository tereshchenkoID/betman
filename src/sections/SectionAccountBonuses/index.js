'use client'

import Empty from '@/modules/Empty'
import BonusCard from '@/modules/Cards/BonusCard'

import style from './index.module.scss'

const SectionAccountBonuses = ({ settings, data, meta }) => {
  return (
    <section className={style.block}>
      {
        meta?.results !== "0"
          ?
            <div className={style.list}>
              {
                data?.map((el, idx) =>
                  <BonusCard
                    key={idx}
                    data={el}
                    settings={settings}
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

export default SectionAccountBonuses
