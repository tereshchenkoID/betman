import {
  forwardRef, useImperativeHandle, useRef, useState
} from 'react'
import clsx from 'clsx'

import { runRules } from '@/helpers/rules'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Field = forwardRef(({
  type = 'text',
  visibility = false,
  data,
  placeholder,
  onChange,
  onValidate,
  onBlur: externalOnBlur,
  classes = null,
  isDisabled = false,
  isRequired = false,
  isClear = true,
  rules = [],
  min = null,
  max = null,
  error = null,
  success = null,
}, ref) => {
  const inputRef = useRef(null)
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  const [show, setShow] = useState(false)

  useImperativeHandle(ref, () => inputRef.current)

  const handleChange = (e) => {
    const val = e.target.value
    onChange?.(val)

    const err = runRules(val, rules)
    onValidate?.(err)
  }

  const handleBlur = (e) => {
    setFocused(false)
    setTouched(true)

    const err = runRules(data, rules)
    onValidate?.(err)

    if (!err && data) {
      externalOnBlur?.(e)
    }
  }

  const handleClear = () => {
    onChange?.('')

    const err = runRules('', rules)
    onValidate?.(err)

    inputRef.current?.focus()
  }

  const isFilled = !!data
  const isLabelActive = focused || isFilled || type === 'date'
  const showError = !!error && (touched || isFilled)
  const showSuccess = !showError && success && isFilled

  const inputType = visibility && type === 'password'
    ? (show ? 'text' : 'password')
    : type

  return (
    <div
      className={
        clsx(
          style.block,
          {
            [style.disabled]: isDisabled,
            [style.focused]: isLabelActive,
            [style.password]: visibility,
            [style.error]: showError,
          },
          classes?.map((el) => style[el] || el)
        )
      }
    >
      <div className={style.wrapper}>
        <input
          ref={inputRef}
          type={inputType}
          className={style.input}
          value={data || ''}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          required={isRequired}
          min={min}
          max={max}
          autoComplete="off"
          disabled={isDisabled}
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
            (data && !isDisabled && isClear) &&
            <button
              type="button"
              className={style.clear}
              onClick={handleClear}
              aria-label="Clear"
            >
              <Icon name="navigation-close" size="sm" />
            </button>
          }

          {
            visibility && type === 'password' &&
            <button
              type="button"
              className={style.eye}
              onClick={() => setShow((prev) => !prev)}
              aria-label="Visibility"
            >
              <Icon
                name={show ? 'toggle-_view' : 'toggle-_view-off'}
                size="sm"
              />
            </button>
          }
        </div>
      </div>
      { showError && <p className={clsx(style.message, style.error)}>{error}</p> }
      { showSuccess && <p className={clsx(style.message, style.success)}>{success}</p>}
    </div>
  )
})

Field.displayName = 'Field'

export default Field
