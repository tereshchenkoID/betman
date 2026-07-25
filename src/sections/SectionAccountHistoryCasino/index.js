'use client'

import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { NAVIGATION } from '@/constant/config'

import { date } from '@/helpers/date'
import { fixed } from '@/helpers/fixed'

import Action from '@/components/Action'
import Pagination from '@/modules/Pagination'
import Empty from '@/modules/Empty'

import style from './index.module.scss'

const SectionAccountHistoryCasino = ({ user, data, meta }) => {
  const t = useTranslations()

  return (
    <section className={style.body}>
      {
        meta?.results !== '0'
          ?
            <>
              <div className={style.table}>
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
              <Pagination data={meta} />
            </>
          :
            <Empty />
      }
    </section>
  )
}

export default SectionAccountHistoryCasino
