import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { useUser } from '@/hooks/useUser'

import Row from './Row'

import style from './index.module.scss'

const Payment = ({ data }) => {
  const t = useTranslations()
  const { currency } = useUser()

  return (
    <div className={style.table}>
      <div className={style.scroll}>
        <div
          className={
            clsx(
              style.row,
              style.first
            )
          }
        >
          <div className={style.cell}><strong>{t('id')}</strong></div>
          <div className={style.cell}><strong>{t('date_create')}</strong></div>
          <div className={style.cell}><strong>{t('pay_system')}</strong></div>
          <div className={style.cell}><strong>{t('status')}</strong></div>
          <div className={style.cell}><strong>{t('type')}</strong></div>
          <div className={style.cell}><strong>{t('amount')}, {currency?.code}</strong></div>
          <div className={style.cell}><strong>{t('details')}</strong></div>
        </div>
        {
          data?.map((el, idx) =>
            <Row
              key={el?.id || idx}
              data={el}
            />
          )
        }
      </div>
    </div>
  )
}

export default Payment
