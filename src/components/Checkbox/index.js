import { useEffect, useState } from 'react'
import classNames from 'classnames'

import { runRules } from 'helpers/rules'

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
  ...rest
}) => {
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState(null)

  const validate = (val = data) => {
    const err = runRules(val, rules)
    setError(err)
    onValidate?.(err)
    return err
  }

  useEffect(() => {
    const err = runRules(data, rules)
    onValidate?.(err)
  }, [])

  return (
    <label
      className={
        classNames(
          style.block,
          {
            [style.disabled]: isDisabled,
            [style.error]: error,
            [style.touched]: touched
          },
          classes && classes.map(el => style[el] || el),
        )
      }
      {...rest}
    >
      <input
        type={'checkbox'}
        className={style.input}
        checked={data === '1'}
        onChange={() => {
          const value = data === '1' ? '0' : '1'
          onChange(value)
          setTouched(true)
          validate(value)
        }}
      />
      <span className={style.item}>
        <Icon name={'icon-status-checkmark'} />
      </span>
      <span className={style.text}>{placeholder}</span>
    </label>
  )
}

export default Checkbox
