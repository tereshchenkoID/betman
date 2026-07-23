import classNames from 'classnames'

import style from './index.module.scss'

const Preload = ({
  count = 8,
  className,
}) => {
  return (
    <div
      className={
        classNames(
          style.block,
          className
        )
      }
    >
      {
        Array.from({ length: count }).map((_, idx) =>
          <div
            key={idx}
            className={style.item}
          />
      )}
    </div>
  )
}

export default Preload
