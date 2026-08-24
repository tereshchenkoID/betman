import clsx from 'clsx'

import style from './index.module.scss'

const Status = ({
  data,
  classes = ['default', 'sm'],
}) => {
  return (
    <span
      className={
        clsx(
          style.block,
          style[`block-${data}`],
          classes?.map(el => style[el] || el),
        )
      }
    />
  )
}

export default Status
