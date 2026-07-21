// // import { useEffect, useRef, useState } from 'react'
// // import classNames from 'classnames'
// //
// // import PhoneInput from 'react-phone-input-2'
// //
// // import { useAuthStore } from 'stores/authStore'
// // import { runRules } from 'helpers/rules'
// //
// // import Preload from '@/components/Preload'
// //
// // import style from './index.module.scss'
// //
// // const localizationCache = {
// //   en: null
// // }
// //
// // const PhoneVerification = ({
// //   data,
// //   country,
// //   onChange,
// //   placeholder,
// //   onValidate,
// //   isDisabled = false,
// //   isRequired = false,
// //   rules = [],
// // }) => {
// //   const { auth } = useAuthStore()
// //   const [error, setError] = useState(null)
// //   const [localization, setLocalization] = useState(null)
// //   const [loading, setLoading] = useState(false)
// //
// //   const inputRef = useRef(null)
// //
// //   const langCode = auth?.language?.code || 'en'
// //
// //   useEffect(() => {
// //     const err = runRules(data, rules)
// //     onValidate?.(err)
// //   }, [])
// //
// //   const loadConfig = async () => {
// //     if (langCode === 'en') {
// //       setLocalization(null)
// //       return
// //     }
// //
// //     if (localizationCache[langCode]) {
// //       setLocalization(localizationCache[langCode])
// //       return
// //     }
// //
// //     setLoading(true)
// //
// //     try {
// //       const response = await fetch(`/locales/${langCode}/countries.json`)
// //       if (!response.ok) throw new Error('Failed to fetch')
// //
// //       const countriesData = await response.json()
// //
// //       const normalizedData = Object.fromEntries(
// //         Object.entries(countriesData).map(([k, v]) => [k.toLowerCase(), v])
// //       )
// //
// //       localizationCache[langCode] = normalizedData
// //
// //       setLocalization(normalizedData)
// //     } catch (e) {
// //       console.error('Config error', e)
// //       setLocalization(null)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }
// //
// //   useEffect(() => {
// //     loadConfig()
// //   }, [langCode])
// //
// //   if (loading) return <Preload counts={1} columns={1} styles={{ height: 48 }} />
// //
// //   return (
// //     <div
// //       className={
// //         classNames(
// //           style.block,
// //           {
// //             [style.error]: error,
// //             [style.disabled]: isDisabled,
// //           }
// //         )
// //       }
// //     >
// //       <div className={style.wrapper}>
// //         <label
// //           className={style.label}
// //           onClick={() => inputRef.current?.focus()}
// //         >
// //           {placeholder}
// //           {isRequired && <span>*</span>}
// //         </label>
// //         <PhoneInput
// //           key={langCode}
// //           ref={inputRef}
// //           localization={localization || undefined}
// //           disabled={loading || isDisabled}
// //           inputProps={{
// //             name: 'phone',
// //             required: isRequired,
// //           }}
// //           containerClass={
// //             classNames(
// //               style['react-tel-input'],
// //               { 'filled': data && data.length > 3 }
// //             )
// //           }
// //           disableCountryCode={false}
// //           placeholder={placeholder}
// //           country={country}
// //           preferredCountries={['ua', 'es', 'gb', 'uz', 'ru']}
// //           value={data}
// //           onChange={value => onChange(value)}
// //         />
// //       </div>
// //       {
// //         error &&
// //         <p className={style.message}>{error}</p>
// //       }
// //     </div>
// //   )
// // }
// //
// // export default PhoneVerification
//
//
// import { useEffect, useRef, useState } from 'react'
// import classNames from 'classnames'
//
// import PhoneInput from 'react-phone-input-2'
//
// import { useAuthStore } from 'stores/authStore'
// import { runRules } from 'helpers/rules'
//
// import Preload from '@/components/Preload'
//
// import style from './index.module.scss'
//
// const localizationCache = {
//   en: null
// }
//
// const PhoneVerification = ({
//   data,
//   country,
//   onChange,
//   placeholder,
//   onValidate,
//   isDisabled = false,
//   isRequired = false,
//   rules = [],
// }) => {
//   const { auth } = useAuthStore()
//   const [focused, setFocused] = useState(false)
//   const [touched, setTouched] = useState(false)
//   const [error, setError] = useState(null)
//
//   const [localization, setLocalization] = useState(null)
//   const [loading, setLoading] = useState(false)
//
//   const inputRef = useRef(null)
//   const langCode = auth?.language?.code || 'en'
//
//   useEffect(() => {
//     const err = runRules(data, rules)
//     onValidate?.(err)
//   }, [])
//
//   useEffect(() => {
//     const err = runRules(data, rules)
//     onValidate?.(err)
//
//     if (touched) setError(err)
//   }, [data])
//
//   const handleBlur = () => {
//     setFocused(false)
//     setTouched(true)
//
//     const err = runRules(data, rules)
//     setError(err)
//     onValidate?.(err)
//   }
//
//   const loadConfig = async () => {
//     if (langCode === 'en') {
//       setLocalization(null)
//       return
//     }
//
//     if (localizationCache[langCode]) {
//       setLocalization(localizationCache[langCode])
//       return
//     }
//
//     setLoading(true)
//
//     try {
//       const response = await fetch(`/locales/${langCode}/countries.json`)
//       if (!response.ok) throw new Error('Failed to fetch')
//
//       const countriesData = await response.json()
//       const normalizedData = Object.fromEntries(
//         Object.entries(countriesData).map(([k, v]) => [k.toLowerCase(), v])
//       )
//
//       localizationCache[langCode] = normalizedData
//       setLocalization(normalizedData)
//     } catch (e) {
//       console.error('Config error', e)
//       setLocalization(null)
//     } finally {
//       setLoading(false)
//     }
//   }
//
//   useEffect(() => {
//     loadConfig()
//   }, [langCode])
//
//   if (loading) return <Preload counts={1} columns={1} styles={{ height: 48 }} />
//
//   const isLabelActive = focused || (data && data.length > 3)
//
//   return (
//     <div
//       className={
//         classNames(
//           style.block,
//           {
//             [style.disabled]: isDisabled,
//             [style.focused]: isLabelActive,
//             [style.error]: touched && error,
//           }
//         )
//       }
//     >
//       <div className={style.wrapper}>
//         <label
//           className={style.label}
//           onClick={() => inputRef.current?.focus()}
//         >
//           {placeholder}
//           {isRequired && <span>*</span>}
//         </label>
//
//         <PhoneInput
//           key={langCode}
//           ref={inputRef}
//           localization={localization || undefined}
//           disabled={loading || isDisabled}
//           inputProps={{
//             name: 'phone',
//             required: isRequired,
//             onBlur: handleBlur,
//           }}
//           containerClass={
//             classNames(
//               style['react-tel-input'],
//               { [style.filled]: data && data.length > 3 }
//             )
//           }
//           disableCountryCode={false}
//           placeholder={placeholder}
//           country={country}
//           preferredCountries={['ua', 'es', 'gb', 'uz', 'ru']}
//           value={data}
//           onChange={value => onChange(value)}
//         />
//       </div>
//       {
//         (touched && error) &&
//         <p className={style.message}>{error}</p>
//       }
//     </div>
//   )
// }
//
// export default PhoneVerification


import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import PhoneInput from 'react-phone-input-2'

import { useAuthStore } from 'stores/authStore'
import { runRules } from 'helpers/rules'

import Preload from '@/components/Preload'

import style from './index.module.scss'

const localizationCache = {
  en: null
}

const Phone = ({
  data,
  country,
  onChange,
  placeholder,
  onValidate,
  isDisabled = false,
  isRequired = false,
  rules = [],
  error = null,
}) => {
  const { auth } = useAuthStore()
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)

  const [localization, setLocalization] = useState(null)
  const [loading, setLoading] = useState(false)

  const inputRef = useRef(null)
  const langCode = auth?.language?.code || 'en'

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

  const loadConfig = async () => {
    if (langCode === 'en') {
      setLocalization(null)
      return
    }

    if (localizationCache[langCode]) {
      setLocalization(localizationCache[langCode])
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/locales/${langCode}/countries.json`)
      if (!response.ok) throw new Error('Failed to fetch')

      const countriesData = await response.json()
      const normalizedData = Object.fromEntries(
        Object.entries(countriesData).map(([k, v]) => [k.toLowerCase(), v])
      )

      localizationCache[langCode] = normalizedData
      setLocalization(normalizedData)
    } catch (e) {
      console.error('Config error', e)
      setLocalization(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadConfig()
  }, [langCode])

  if (loading) return <Preload counts={1} columns={1} styles={{ height: 48 }} />

  const isFilled = data && data.length > 3
  const isLabelActive = focused || isFilled

  const showError = error && (touched || (isFilled && error !== runRules('', rules)))

  return (
    <div
      className={
        classNames(
          style.block,
          {
            [style.disabled]: isDisabled,
            [style.focused]: isLabelActive,
            [style.error]: showError,
          }
        )
      }
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
          key={langCode}
          ref={inputRef}
          localization={localization || undefined}
          disabled={loading || isDisabled}
          inputProps={{
            name: 'phone',
            required: isRequired,
            onBlur: handleBlur,
            onFocus: () => setFocused(true),
          }}
          containerClass={
            classNames(
              style['react-tel-input'],
              { [style.filled]: isFilled }
            )
          }
          disableCountryCode={false}
          placeholder={placeholder}
          country={country}
          preferredCountries={['ua', 'es', 'gb', 'uz', 'ru']}
          value={data}
          onChange={value => onChange(value)}
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
