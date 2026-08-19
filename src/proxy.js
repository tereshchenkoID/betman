// import { NextResponse } from 'next/server'
// import createMiddleware from 'next-intl/middleware'
//
// import { routing } from '@/i18n/routing'
//
// const handleI18nRouting = createMiddleware(routing);
//
// function getRequestLocale(request, pathname) {
//   const segments = pathname.split('/').filter(Boolean);
//   const firstSegment = segments[0];
//
//   if (firstSegment && routing.locales.includes(firstSegment)) {
//     return firstSegment;
//   }
//
//   const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
//   if (cookieLocale && routing.locales.includes(cookieLocale)) {
//     return cookieLocale;
//   }
//
//   return routing.defaultLocale;
// }
//
// export async function proxy(request) {
//   const { pathname } = request.nextUrl;
//
//   if (pathname.includes('.') || pathname.startsWith('/_next')) {
//     return NextResponse.next();
//   }
//
//   const locale = getRequestLocale(request, pathname);
//
//   const pathnameWithoutLocale = pathname.replace(new RegExp(`^/(${routing.locales.join('|')})`), '');
//   const isAccountPage = pathnameWithoutLocale === '/account' || pathnameWithoutLocale.startsWith('/account/');
//   const hasToken = request.cookies.has('NEXT_SID');
//
//   if (isAccountPage && !hasToken) {
//     const notFoundUrl = new URL(`/${locale}/404`, request.url);
//     return NextResponse.redirect(notFoundUrl);
//   }
//
//   const response = handleI18nRouting(request);
//   if (response) {
//     response.headers.set('x-next-locale', locale);
//   }
//
//   return response;
// }
//
// export const config = {
//   matcher: ['/', '/(en|uk)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
// };


import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/i18n/routing'

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get('user-agent') || '';
  const isPrefetch = request.headers.get('x-middleware-prefetch');

  // 1. Пропускаем статику и служебные роуты
  if (
    pathname.includes('.') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // 2. Если это TelegramBot — не делаем никаких редиректов авторизации, отдаем i18n
  if (ua.includes('TelegramBot')) {
    return handleI18nRouting(request);
  }

  // 3. Безопасное определение текущей локали без RegExp
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = routing.locales.includes(segments[0])
    ? segments[0]
    : (request.cookies.get('NEXT_LOCALE')?.value || routing.defaultLocale);

  // 4. Определение чистого пути (без локали)
  const pathnameWithoutLocale = routing.locales.includes(segments[0])
    ? `/${segments.slice(1).join('/')}`
    : pathname;

  const isAccountPage = pathnameWithoutLocale === '/account' || pathnameWithoutLocale.startsWith('/account/');
  const hasToken = request.cookies.has('NEXT_SID');

  // 5. Защита приватных роутов без редирект-петли
  if (isAccountPage && !hasToken) {
    const response = NextResponse.redirect(new URL(`/${currentLocale}/404`, request.url));
    response.headers.set('x-next-locale', currentLocale);
    return response;
  }

  // 6. Выполняем роутинг next-intl
  const response = handleI18nRouting(request);

  if (response) {
    response.headers.set('x-next-locale', currentLocale);

    // Блокируем кэширование редиректов в Telegram WebView
    if (isPrefetch) {
      response.headers.set('Cache-Control', 'no-store, must-revalidate');
    }
  }

  return response;
}

export const config = {
  // Исключаем все служебные файлы, Vercel и API из работы middleware
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
