import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'

import { runRules } from '@/helpers/rules'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Field = ({
  type = 'text',
  visibility = false,
  data,
  placeholder,
  onChange,
  onValidate,
  classes = null,
  isDisabled = false,
  isRequired = false,
  rules = [],
  min = null,
  max = null,
  error = null,
}) => {
  const inputRef = useRef(null)
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false) // Локальный тач для фронтенд-валидации
  const [show, setShow] = useState(false)

  useEffect(() => {
    const err = runRules(data, rules)
    onValidate?.(err)
  }, [data])

  const handleBlur = () => {
    setFocused(false)
    setTouched(true)

    const err = runRules(data, rules)
    onValidate?.(err)
  }

  const isFilled = !!data
  const showError = error && (touched || (isFilled && error !== runRules('', rules)));

  const isLabelActive = focused || isFilled || type === 'date'

  const inputType = visibility && type === 'password'
    ? (show ? 'text' : 'password')
    : type

  return (
    <div
      className={
        classNames(
          style.block,
          {
            [style.disabled]: isDisabled,
            [style.focused]: isLabelActive,
            [style.error]: showError, // Юзаем нашу вычисленную переменную
            [style.password]: visibility,
          },
          classes && classes.map(el => style[el] || el),
        )
      }
    >
      <div className={style.wrapper}>
        <input
          ref={inputRef}
          className={style.input}
          type={inputType}
          value={data}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          required={isRequired}
          min={min}
          max={max}
          autoComplete={'on'}
        />
        <label
          className={style.label}
          onClick={() => inputRef.current?.focus()}
        >
          {placeholder}
          {isRequired && <span>*</span>}
        </label>
        <div className={style.options}>
          {
            (data && !isDisabled) &&
            <button
              type="button"
              className={style.clear}
              onClick={() => onChange('')}
              aria-label={'Clear'}
            >
              <Icon name="icon-navigation-close" size={'sm'} />
            </button>
          }

          {
            visibility && type === 'password' &&
            <button
              type="button"
              className={style.eye}
              onClick={() => setShow(!show)}
              aria-label={'Visibility'}
            >
              <Icon name={show ? 'icon-toggle-view' : 'icon-toggle-view-off'} size={'sm'} />
            </button>
          }
        </div>
      </div>
      {
        showError &&
        <p className={style.message}>{error}</p>
      }
    </div>
  )
}

export default Field
