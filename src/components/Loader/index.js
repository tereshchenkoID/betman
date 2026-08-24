import clsx from 'clsx'

import style from './index.module.scss'

const Loader = ({ type = 'block' }) => {
  return (
    <div
      className={
        clsx(
          style.block,
          style[type]
        )
      }
    >
      <div className={style.spin} />
    </div>
  )
}

export default Loader
