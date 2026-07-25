import { useState } from 'react'

import { useCopy } from '@/hooks/useCopy'
import { date } from '@/helpers/date'

import Icon from '@/components/Icon'
import Action from '@/components/Action'

import style from './index.module.scss'

const maskNumber = (value) => value ? value.toString().replace(/(\d{2})\d+(\d{2})/, '$1*******$2') : ''

const Details = ({ name, value }) => {
  const { copy, copied } = useCopy()
  const [show, setShow] = useState(false)

  if (name.includes('_date')) {
    return date(Number(value))
  }

  if (name === 'order') {
    const masked = maskNumber(value)

    return (
      <div className={style.mask}>
        <span
          className={style.hidden}
          onClick={() => setShow(prev => !prev)}
        >
          {show ? value : masked}
        </span>
        <Action
          classes={['secondary', 'md', 'square']}
          onChange={() => copy(value)}
        >
          <Icon name={copied ? 'icon-status-checkmark' : 'icon-actions-copy'} />
        </Action>
      </div>
    )
  }

  return value || '-'
}

export default Details
