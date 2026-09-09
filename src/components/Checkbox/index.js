import { useState } from 'react'
import clsx from 'clsx'

import { runRules } from '@/helpers/rules'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Checkbox = ({
  data,
  placeholder,
  onChange,
  classes = null,
  isDisabled = false,
  onValidate,
  rules = [],
  error = null,
  ...rest
}) => {
  const [touched, setTouched] = useState(false)

  const handleChange = () => {
    if (isDisabled) return

    const nextValue = data === '1' ? '0' : '1'

    onChange?.(nextValue)
    setTouched(true)

    const err = runRules(nextValue, rules)
    onValidate?.(err)
  }

  const isChecked = data === '1'
  const showError = !!error && touched

  return (
    <label
      className={
        clsx(
          style.block,
          {
            [style.disabled]: isDisabled,
            [style.error]: showError,
          },
          classes?.map((el) => style[el] || el)
        )
      }
      {...rest}
    >
      <input
        type="checkbox"
        className={style.input}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
      />
      <span className={style.item}>
        <Icon name="status-checkmark" />
      </span>
      <span className={style.text}>{placeholder}</span>
    </label>
  )
}

export default Checkbox
