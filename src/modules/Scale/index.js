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
        <strong>{format(amount)} {currency}</strong>
        <strong>{format(max)} {currency}</strong>
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
