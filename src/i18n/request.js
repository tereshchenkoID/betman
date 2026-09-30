import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  const fetchMessages = async (targetLocale) => {
    const res = await fetch(`${process.env.API_BASE_URL}/messages/${targetLocale}.json`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  }

  let messages = await fetchMessages(locale)

  if (!messages) {
    console.warn(`Messages for locale "${locale}" not found on API. Fallback to "${routing.defaultLocale}".`)

    if (locale !== routing.defaultLocale) {
      messages = await fetchMessages(routing.defaultLocale)
      locale = routing.defaultLocale
    }
  }

  return {
    locale,
    messages: messages || {}
  }
})
