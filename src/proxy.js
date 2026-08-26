import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/i18n/routing'

const handleI18nRouting = createMiddleware(routing)

export async function proxy(request) {
  const { pathname } = request.nextUrl

  if (pathname.includes('.') || pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  const response = handleI18nRouting(request)

  if (response.status >= 300 && response.status < 400) {
    return response
  }

  const locale =
    response.headers.get('x-middleware-request-x-next-intl-locale') ||
    routing.defaultLocale

  const pathnameWithoutLocale =
    pathname.replace(new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`), '') || '/'

  const isAccountPage =
    pathnameWithoutLocale === '/account' || pathnameWithoutLocale.startsWith('/account/')
  const hasToken = request.cookies.has('NEXT_SID')

  if (isAccountPage && !hasToken) {
    const loginUrl = new URL(`/${locale}/login`, request.url)
    return NextResponse.redirect(loginUrl)
  }

  response.headers.set('x-next-locale', locale)

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|manifest.json|.*\\..*).*)',
  ],
}
