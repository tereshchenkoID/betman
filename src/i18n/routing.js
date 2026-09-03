import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'fr', 'ru', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',
})
