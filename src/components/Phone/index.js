'use client'

import {useLocale} from 'next-intl'
import {useEffect, useMemo, useRef, useState, useTransition} from 'react'
import classNames from 'classnames'
import PhoneInput from 'react-phone-input-2'

import {runRules} from '@/helpers/rules'
import {action} from './action'

import Preload from '@/components/Preload'

import style from './index.module.scss'

const countriesCache = {}

const Phone = ({
  data,
  country,
  onChange,
  placeholder,
  onValidate,
  onBlur: externalOnBlur,
  isDisabled = false,
  isRequired = false,
  rules = [],
  error = null,
}) => {
  const locale = useLocale()
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)

  const [countries, setCountries] = useState(countriesCache[locale] || null)
  const [isPending, startTransition] = useTransition()

  const inputRef = useRef(null)

  useEffect(() => {
    const err = runRules(data, rules)
    onValidate?.(err)
  }, [data])

  const handleBlur = (e) => {
    setFocused(false)
    setTouched(true)

    const err = runRules(data, rules)
    onValidate?.(err)

    if (!err && data) {
      externalOnBlur?.(e)
    }
  }

  useEffect(() => {
    if (countriesCache[locale]) {
      setCountries(countriesCache[locale])
      return
    }

    startTransition(async () => {
      const res = await action()
      if (res) {
        countriesCache[locale] = res
        setCountries(res)
      }
    })
  }, [locale])

  const localization = useMemo(() => {
    if (!countries) return undefined

    if (Array.isArray(countries)) {
      return countries.reduce((acc, item) => {
        const code = item.code || item.iso2
        const name = item.text || item.name || item.title
        if (code && name) {
          acc[code.toLowerCase()] = name
        }
        return acc
      }, {})
    }

    return countries?.data.reduce((acc, item) => {
      acc[item.alpha_2.toLowerCase()] = item.label
      return acc
    }, {})
  }, [countries])

  if (isPending) {
    return <Preload count={1} className={style.skeleton} />
  }

  if (countries?.meta?.results === '0') return null

  const isFilled = data && data.length > 3
  const isLabelActive = focused || isFilled
  const showError = error && (touched || (isFilled && error !== runRules('', rules)))

  return (
    <div
      className={classNames(style.block, {
        [style.disabled]: isDisabled,
        [style.focused]: isLabelActive,
        [style.error]: showError,
      })}
    >
      <div className={style.wrapper}>
        <label
          className={style.label}
          onClick={() => inputRef.current?.focus()}
        >
          {placeholder}
          {isRequired && <span>*</span>}
        </label>

        <PhoneInput
          key={locale}
          ref={inputRef}
          localization={localization}
          disabled={isPending || isDisabled}
          inputProps={{
            name: 'phone',
            required: isRequired,
            onBlur: handleBlur,
            onFocus: () => setFocused(true),
          }}
          containerClass={classNames(style['react-tel-input'], {
            [style.filled]: isFilled,
          })}
          disableCountryCode={false}
          placeholder={placeholder}
          country={country}
          preferredCountries={['ua', 'es', 'gb', 'uz', 'ru']}
          value={data}
          onChange={(value) => onChange(value)}
        />
      </div>
      {showError && <p className={style.message}>{error}</p>}
    </div>
  )
}

export default Phone
