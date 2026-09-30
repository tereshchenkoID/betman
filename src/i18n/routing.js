import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ru', 'uk', 'fr', 'pt', 'es', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: false,
})
