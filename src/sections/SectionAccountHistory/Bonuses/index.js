import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import { BONUS_STATUS } from '@/constant/config'

import { useModal } from '@/context/ModalContext'
import { date } from '@/helpers/date'

import Action from '@/components/Action'

import style from './index.module.scss'

const Bonuses = ({ user, data }) => {
  const t = useTranslations()
  const { openModal } = useModal()

  console.log(data)

  return (
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
          <div className={style.cell}><strong>{t('date')}</strong></div>
          <div className={style.cell}><strong>{t('bonus')}</strong></div>
          <div className={style.cell}><strong>{t('status')}</strong></div>
          <div className={style.cell}><strong>{t('amount')}, {user?.currency?.code}</strong></div>
          <div className={style.cell}><strong>{t('payout')}, {user?.currency?.code}</strong></div>
          <div className={style.cell}><strong>{t('payout_date')}</strong></div>
          <div className={style.cell}><strong>{t('details')}</strong></div>
        </div>
        {
          data?.map((el, idx) =>
            <div
              key={idx}
              className={style.row}
            >
              <div className={style.cell}>{el?.id}</div>
              <div className={style.cell}>{date(el?.date_in)}</div>
              <div className={style.cell}>{el?.bonus?.name}</div>
              <div className={style.cell}>{t(BONUS_STATUS[el?.status])}</div>
              <div className={style.cell}>{el?.amount_out}</div>
              <div className={style.cell}>{el?.amount_in}</div>
              <div className={style.cell}>{date(el?.date_out)}</div>
              <div className={style.cell}>
                <Action
                  classes={['primary', 'sm']}
                  placeholder={t('show')}
                  onChange={() => {
                    openModal('paymentDetails', { data: el }, { title: `${t('details')}: ${el?.id}` })
                  }}
                />
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Bonuses
