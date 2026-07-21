// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';
//
// const handleI18nRouting = createMiddleware(routing);
//
// export function proxy(request) {
//   return handleI18nRouting(request);
// }
//
// export const config = {
//   matcher: ['/', '/(ru|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
// };


import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export function proxy(request) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.includes('.') || pathname.startsWith('/_next')) {
    return handleI18nRouting(request);
  }

  const isProfilePage = pathname === '/profile' ||
    pathname.startsWith('/profile/') ||
    /\/[a-z]{2}\/profile(\/|$)/.test(pathname);

  const hasToken = request.cookies.has('NEXT_SID');

  if (searchParams.get('logout') === 'true') {
    const segments = pathname.split('/').filter(Boolean);
    const locale = (segments[0] && segments[0].length === 2) ? segments[0] : 'en';

    // const homepageUrl = new URL(`/${locale}`, request.url);
    const logoutUrl = new URL(`/${locale}/logout`, request.url);
    const response = NextResponse.redirect(logoutUrl);

    response.cookies.delete('NEXT_SID');
    response.cookies.delete('USER_INFO');
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');

    return response;
  }

  if (isProfilePage && !hasToken) {
    const segments = pathname.split('/').filter(Boolean);
    const locale = (segments[0] && segments[0].length === 2) ? segments[0] : 'en';

    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(ru|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
