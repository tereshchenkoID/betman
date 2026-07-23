import { useTranslations } from 'next-intl'

const normalize = (value) => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object')
    return value?.value != null ? String(value.value) : ''
  return String(value)
}

const normalizeDate = (d) => {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  return date
}

const getAge = (birthDate, today) => {
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}

export const useValidations = () => {
  const t = useTranslations()

  return {
    required: (msg = 'errors.field_required') => (value) => {
      if (value === '0') return t(msg)
      return normalize(value).trim() ? null : t(msg)
    },

    email: (regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, msg = 'errors.format_email') => (value) => {
      const v = normalize(value).trim()
      if (!v) return null

      return regex.test(v) ? null : t(msg)
    },

    phone: (msg = 'errors.format_phone') => (value) => {
      const v = normalize(value).replace(/\s|-/g, '')
      if (!v) return null
      const regex = /^\+?\d{7,15}$/
      return regex.test(v) ? null : t(msg)
    },

    adult: (minAge = 18) => (value) => {
      const v = normalize(value)
      if (!v) return null
      const birthDate = normalizeDate(v)

      if (isNaN(birthDate.getTime())) {
        return t('errors.invalid_date')
      }

      const today = normalizeDate(new Date())

      if (birthDate > today) {
        return t('errors.invalid_date')
      }

      const age = getAge(birthDate, today)
      return age >= minAge ? null : t('errors.age_restriction')
    },

    letters: (msg = 'errors.letters_required') => (value) => {
      const v = normalize(value).trim()
      if (!v) return null
      const regex = /^[\p{L}\s-]+$/u
      return regex.test(v) ? null : t(msg)
    },

    latinAlphaNumeric: (msg = 'errors.latin_alphanumeric') => (value) => {
      const v = normalize(value).trim()
      if (!v) return null
      const regex = /^[a-zA-Z0-9@._+\-]+$/
      return regex.test(v) ? null : t(msg)
    },

    minLength: (min, msg = 'errors.minimum') => (value) => {
      const v = normalize(value)
      if (!v) return null
      return v.length >= min ? null : t(msg, { min })
    },

    maxLength: (max, msg = 'errors.maximum') => (value) => {
      const v = normalize(value)
      if (!v) return null
      return v.length <= max ? null : t(msg, { max })
    },

    postcode: (msg = 'errors.invalid_postcode', regex = /^\d{4,10}$/) => (value) => {
      const v = normalize(value).trim()
      if (!v) return null

      return regex.test(v) ? null : t(msg)
    },
  }
}
