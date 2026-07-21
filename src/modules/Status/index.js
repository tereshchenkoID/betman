import classNames from 'classnames'

import style from './index.module.scss'

const Status = ({ data, size = 'sm' }) => {
  return (
    <span
      className={
        classNames(
          style.block,
          style[`block-${data}`],
          style[size]
        )
      }
    />
  )
}

export default Status
