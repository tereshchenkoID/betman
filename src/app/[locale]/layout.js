import Script from 'next/script'
import { getMessages } from 'next-intl/server'
import { Oswald, Roboto } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleTagManager } from '@next/third-parties/google'
import { preconnect } from 'react-dom'
import NextTopLoader from 'nextjs-toploader'
import clsx from 'clsx'

import { ModalProvider } from '@/context/ModalContext'
import { WebSocketProvider } from '@/context/WebSocketContext'
import { FavoritesProvider } from '@/context/FavoritesContext'

import { getFavorites, getCachedUser } from '@/app/actions/static'

import Toastify from '@/widgets/Toastify'
import ScrollToTop from '@/modules/ScrollToTop'
import WSUpdater from '@/modules/WSUpdater'
import Telegram from '@/modules/Telegram'
import SessionHandler from '@/modules/SessionHandler'

import './layout.scss'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family',
  preload: true,
})

const barlowCondensed = Oswald({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-alt',
  preload: false,
})

export const metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/logo.svg', type: 'image/svg+xml' },
      { url: '/icons/logo192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/logo180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default async function RootLayout({ children, params }) {
  preconnect('https://www.googletagmanager.com')

  const { locale } = await params
  const [
    messages,
    user,
    favorites,
  ] = await Promise.all([
    getMessages({ locale }),
    getCachedUser(),
    getFavorites().catch(() => [])
  ])

  return (
    <html lang={locale} suppressHydrationWarning>
    <GoogleTagManager gtmId="GTM-PK9TK23W" />
    <body
      className={
        clsx(
          barlowCondensed.variable,
          roboto.variable,
        )
      }
    >
    {
      user?.session_type === 'tma' &&
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
    }
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
    >
      <Telegram auth={user} />
      <SessionHandler />
      <FavoritesProvider
        user={user}
        data={favorites?.data}
        meta={favorites?.meta}
      >
        <ScrollToTop />
        <NextTopLoader
          color="#0490A8"
          crawlSpeed={400}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          shadow="none"
          zIndex={14}
        />
        <ModalProvider>
          <WebSocketProvider user={user}>
            {children}
            <WSUpdater user={user} />
          </WebSocketProvider>
        </ModalProvider>
        <Toastify />
        <SpeedInsights />
      </FavoritesProvider>
    </NextIntlClientProvider>
    </body>
    </html>
  )
}
