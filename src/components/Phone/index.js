'use client'

import { useLocale } from 'next-intl'
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { usePhoneInput, CountrySelector, defaultCountries } from 'react-international-phone'
import clsx from 'clsx'

import { runRules } from '@/helpers/rules'
import { action } from './action'

import Preload from '@/components/Preload'

import 'react-international-phone/style.css'
import style from './index.module.scss'

const countriesCache = {}

const Phone = ({
  data,
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
  const [isLoading, setIsLoading] = useState(!countriesCache[locale])

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
    let isSubscribed = true

    if (countriesCache[locale]) {
      startTransition(() => {
        setCountries(countriesCache[locale])
        setIsLoading(false)
      })

      return
    }

    startTransition(async () => {
      setIsLoading(true)

      try {
        const res = await action()
        if (isSubscribed && res) {
          countriesCache[locale] = res
          setCountries(res)
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false)
        }
      }
    })

    return () => {
      isSubscribed = false
    }
  }, [locale])

  const localizedCountries = useMemo(() => {
    if (!countries) return defaultCountries

    const rawList = Array.isArray(countries) ? countries : countries?.data
    if (!rawList) return defaultCountries

    const namesMap = rawList.reduce((acc, item) => {
      const code = (item.code || item.iso2 || item.alpha_2)?.toLowerCase()
      const name = item.text || item.name || item.title || item.label
      if (code && name) acc[code] = name
      return acc
    }, {})

    return defaultCountries.map((c) => {
      const iso2 = c[1]
      const customName = namesMap[iso2]

      if (customName) {
        const updated = [...c]
        updated[0] = customName
        return updated
      }

      return c
    })
  }, [countries])

  const {
    phone,
    handlePhoneValueChange,
    inputRef: phoneInputRef,
    country: currentCountry,
    setCountry,
  } = usePhoneInput({
    defaultCountry: 'us',
    value: data || '',
    countries: localizedCountries,
    onChange: (phoneData) => onChange?.(phoneData.phone),
  })

  const setCombinedRef = useCallback((node) => {
    phoneInputRef.current = node
    inputRef.current = node
  }, [phoneInputRef])

  if (isLoading) {
    return <Preload count={1} className={style.skeleton} />
  }

  if (countries?.meta?.results === '0') return null

  const isFilled = phone && phone.length > 3
  const showError = error && (touched || (isFilled && error !== runRules('', rules)))

  return (
    <div
      className={
        clsx(
          style.block,
          {
            [style.disabled]: isDisabled || isPending,
            [style.focused]: focused,
            [style.error]: showError,
          }
        )
      }
    >
      <label
        className={style.label}
        onClick={() => inputRef.current?.focus()}
      >
        {placeholder}
        {isRequired && <span>*</span>}
      </label>
      <div className={style.wrapper}>
        <CountrySelector
          key={locale}
          selectedCountry={currentCountry.iso2}
          onSelect={(countryData) => setCountry(countryData.iso2)}
          disabled={isDisabled || isPending}
          countries={localizedCountries}
          preferredCountries={['ua', 'es', 'gb', 'uz', 'ru']}
          buttonClassName={style.flag}
          dropdownStyleProps={{
            className: style.dropdown,
          }}
        />
        <input
          ref={setCombinedRef}
          type="tel"
          name="phone"
          value={phone}
          onChange={handlePhoneValueChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          disabled={isDisabled || isPending}
          required={isRequired}
          placeholder={placeholder}
          className={style.field}
        />
      </div>
      {
        showError &&
        <p className={style.message}>{error}</p>
      }
    </div>
  )
}

export default Phone
