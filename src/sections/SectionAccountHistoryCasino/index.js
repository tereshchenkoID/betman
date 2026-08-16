'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { NAVIGATION } from '@/constant/config'

import { date } from '@/helpers/date'
import { fixed } from '@/helpers/fixed'

import Action from '@/components/Action'
import Select from '@/components/Select'
import DateRange from '@/components/DateRange'
import Pagination from '@/modules/Pagination'
import Empty from '@/modules/Empty'
// import Stat from './Stat'

import style from './index.module.scss'

const QUANTITY = [
  {
    value: 10,
    label: '10'
  },
  {
    value: 20,
    label: '20'
  },
  {
    value: 50,
    label: '50'
  },
  {
    value: 100,
    label: '100'
  }
]

const SectionAccountHistoryCasino = ({ user, data, meta }) => {
  const t = useTranslations()

  const [quantity, setQuantity] = useState( {
    value: 10,
    label: '10'
  })

  const [range, setRange] = useState({
    from: new Date().setHours(0, 0, 0, 0),
    to: new Date().getTime(),
  })

  return (
    <section>
      {/*<div className={style.stats}>*/}
      {/*  <Stat />*/}
      {/*</div>*/}

      <div className={style.header}>
        <DateRange
          placeholder="Date Range"
          value={range}
          onChange={(range) => setRange(range)}
        />

        <Select
          placeholder={t('quantity')}
          classes={[style.select]}
          data={QUANTITY.map(({ value, label }) => ({ value, label }))}
          value={quantity}
          isSearch={false}
          onChange={value => setQuantity(value)}
        />
      </div>
      {
        meta?.results !== '0'
          ?
            <>
              <div className={style.table}>
                <div className={style.scroll}>
                  <div
                    className={
                      classNames(
                        style.row,
                        style.first
                      )
                    }
                  >
                    <div className={style.cell}><strong>{t('id')}</strong></div>
                    <div className={style.cell}><strong>{t('date_time')}</strong></div>
                    <div className={style.cell}><strong>{t('game')}</strong></div>
                    <div className={style.cell}><strong>{t('amount')}, {user?.currency?.code}</strong></div>
                    <div className={style.cell}><strong>{t('result')}, {user?.currency?.code}</strong></div>
                  </div>
                  {
                    data?.map((el, idx) =>
                      <div
                        key={idx}
                        className={style.row}
                      >
                        <div className={style.cell}>{el.id}</div>
                        <div className={style.cell}>{date(el.dateTime)}</div>
                        <div className={style.cell}>
                          <Action
                            to={`${NAVIGATION.game.url}/${el.game.id}/0`}
                            classes={['outline']}
                            placeholder={el.game.title}
                          />
                        </div>
                        <div className={style.cell}>{el.amount}</div>
                        <div
                          className={
                            classNames(
                              style.cell,
                              style[el.diff[0] === '+' ? 'green' : 'red'],
                            )
                          }
                        >
                          {el.diff[0] === '+' && '+'}{fixed(el.diff)}
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
              <Pagination data={meta} />
            </>
          :
            <Empty />
      }
    </section>
  )
}

export default SectionAccountHistoryCasino
