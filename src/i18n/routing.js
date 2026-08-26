import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'uk'],
  defaultLocale: 'en',
  localePrefix: 'always',
})

export const {
  Link,
  usePathname,
  useRouter,
  redirect
} = createNavigation(routing)
