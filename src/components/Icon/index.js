import clsx from 'clsx'

import style from './index.module.scss'

const Icon = ({
  name,
  size = 'md',
  classes= [],
  ...rest
}) => {
  return (
    <svg
      className={
        clsx(
          style.icon,
          style[size],
          classes
        )
      }
      aria-hidden="true"
      role="img"
      {...rest}
    >
      <use href={`/images/iconography.svg#${name}`} />
    </svg>
  )
}

export default Icon
