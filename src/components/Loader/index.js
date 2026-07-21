import classNames from 'classnames'

import style from './index.module.scss'

const Loader = ({ type = 'block' }) => {
  return (
    <div
      className={
        classNames(
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
