import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'uk'],
  defaultLocale: 'en'
})

export const { Link, usePathname, useRouter } = createNavigation(routing)
