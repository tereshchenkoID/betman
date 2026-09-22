import clsx from 'clsx'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const ICONS = {
  error: 'status-danger',
  info: 'status-info',
  warning: 'status-danger',
  success: 'status-checkmark-alt',
}

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
      <Icon
        name={ICONS[type]}
        size="sm"
      />
      <p>{text}</p>
    </div>
  )
}

export default Notification
