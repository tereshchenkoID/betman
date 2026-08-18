import { useTranslations } from 'next-intl'

import Details from './Details'

import style from './index.module.scss'

const PaymentDetailsModal = ({ data }) => {
  const t = useTranslations()

  if (!data?.details) return null

  return (
    <div className={style.block}>
      {
        Object.entries(data.details).map(([key, value]) =>
          <div
            key={key}
            className={style.row}
          >
            <div className={style.cell}>{t(key)}:</div>
            <div className={style.cell}>
              <Details name={key} value={value} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default PaymentDetailsModal
