import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// export default getRequestConfig(async ({ locale }) => {
//   if (!routing.locales.includes(locale)) locale = routing.defaultLocale
//
//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default
//   }
// })

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/messages/${locale}.json`, {
      cache: 'no-store',
    })

    return {
      locale,
      messages: await res.json()
    }
  } catch (error) {
    console.error(`Failed to load messages for ${locale} from API:`, error)
  }
})
