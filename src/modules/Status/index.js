import classNames from 'classnames'

import style from './index.module.scss'

const Status = ({
  data,
  classes = ['default', 'sm'],
}) => {
  return (
    <span
      className={
        classNames(
          style.block,
          style[`block-${data}`],
          classes && classes.map(el => style[el] || el),
        )
      }
    />
  )
}

export default Status
