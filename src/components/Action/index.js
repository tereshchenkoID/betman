import { Link } from '@/i18n/routing'
import { forwardRef } from 'react'
import clsx from 'clsx'

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
    className: clsx(
      style.block,
      {
        [style.active]: isActive,
        [style.loading]: isLoading,
        [style.disabled]: isDisabled,
      },
      classes?.map(el => style[el] || el),
    ),
    onClick: onChange,
    'aria-label': placeholder || 'Action',
    ...rest,
  }

  if (Boolean(to)) {
    props.href = to
    if (isDisabled) {
      props['aria-disabled'] = true
      props.tabIndex = -1
    }
  } else if(Tag === 'button') {
    props.type = type
    props.disabled = isDisabled
  } else {
    if (isDisabled) {
      props['aria-disabled'] = true
    }
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
