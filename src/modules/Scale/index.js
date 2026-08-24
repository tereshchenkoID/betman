import clsx from 'clsx'

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
          isInverted && style.inverted
        )
      }
    >
      <div className={style.header}>
        <strong>{amount} {currency}</strong>
        <strong>{max} {currency}</strong>
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
