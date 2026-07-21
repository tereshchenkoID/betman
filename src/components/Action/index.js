import Link from 'next/link'
import { forwardRef } from 'react'
import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Action = forwardRef(({
  to,
  type = 'button',
  tag = 'button',
  placeholder,
  children,
  onChange = () => {},
  classes = ['primary', 'lg'],
  isDisabled = false,
  isLoading = false,
  isActive = false,
  ...rest
}, ref) => {

  const Tag = to ? Link : (tag || type)

  const props = {
    ref,
    className: classNames(
      style.block,
      {
        [style.active]: isActive,
        [style.loading]: isLoading,
        [style.disabled]: isDisabled,
      },
      classes && classes.map(el => style[el] || el),
    ),
    onClick: onChange,
    'aria-label': placeholder || 'Action',
    ...rest,
  }

  if (!to) {
    props.type = type
    props.disabled = isDisabled
  } else {
    props.href = to
  }

  return (
    <Tag {...props}>
      <span className={style.placeholder}>
        {children || placeholder}
      </span>

      {
        isLoading &&
        <span className={style.spinner}>
          <Icon size="lg" name="icon-games-spinner" />
        </span>
      }
    </Tag>
  )
})

Action.displayName = 'Action'

export default Action
