import clsx from 'clsx'

import style from './index.module.scss'

const Notification = ({
  text,
  type,
  classes = null,
}) => {

  return (
    <div
      className={
        clsx(
          style.block,
          style[type],
          classes
        )
      }
    >
      <p>{text}</p>
    </div>
  )
}

export default Notification
