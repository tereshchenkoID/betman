import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { format } from '@/helpers/format'

import style from './index.module.scss'

const Scale = ({
  amount,
  max,
  percentage,
  currency,
  isInverted,
}) => {
  const t = useTranslations()

  return (
    <div
      className={
        clsx(
          style.block,
          {
            [style.inverted]: isInverted
          }
        )
      }
    >
      <div className={style.header}>
        <strong className={style.amount}>{format(amount)} {currency}</strong>
        <p className={style.text}>{t('wager_progress')}</p>
        <strong className={style.max}>{format(max)} {currency}</strong>
      </div>
      <div className={style.scale}>
        <div
          className={style.value}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}

export default Scale
