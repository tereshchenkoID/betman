import Script from 'next/script'
import localFont from 'next/font/local'
import { getMessages } from 'next-intl/server'
import { Oswald, Roboto } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleTagManager } from '@next/third-parties/google'
import { preload } from 'react-dom'
import NextTopLoader from 'nextjs-toploader'
import classNames from 'classnames'

import { ModalProvider } from '@/context/ModalContext'
import { WebSocketProvider } from '@/context/WebSocketContext'
import { FavoritesProvider } from '@/context/FavoritesContext'

import { getCachedUser } from '@/app/actions/auth'
import { getFavorites } from '@/app/actions/static'

import Toastify from '@/components/Toastify'
import ScrollToTop from '@/modules/ScrollToTop'
import Telegram from '@/modules/Telegram'
import WSUpdater from '@/modules/WSUpdater'
import SessionHandler from '@/modules/SessionHandler'

import 'keen-slider/keen-slider.min.css'
import 'react-phone-input-2/lib/style.css'

import './layout.scss'
import './icons.scss'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family',
})

const barlowCondensed = Oswald({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-alt',
})

const iconography = localFont({
  src: '../../../public/fonts/iconography.woff2',
  display: 'swap',
  variable: '--font-iconography',
})

export const metadata = {
  icons: {
    icon: [
      { url: '/icons/logo32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/logo64.png', sizes: '64x64', type: 'image/png' },
      { url: '/icons/logo96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/logo192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/logo120.png', sizes: '120x120' },
      { url: '/icons/logo152.png', sizes: '152x152' },
      { url: '/icons/logo167.png', sizes: '167x167' },
      { url: '/icons/logo180.png', sizes: '180x180' },
      { url: '/icons/logo192.png', sizes: '192x192' },
    ],
  },
}

export default async function RootLayout({ children, params }) {
  preload('/images/logo-desktop.svg', { as: 'image', type: 'image/svg+xml' })
  preload('/images/logo-mobile.svg', { as: 'image', type: 'image/svg+xml' })

  const { locale } = await params
  const [
    messages,
    user,
    favorites,
  ] = await Promise.all([
    getMessages({ locale }),
    getCachedUser(),
    getFavorites()
  ])

  return (
    <html lang={locale} suppressHydrationWarning>
    <GoogleTagManager gtmId="GTM-PK9TK23W" />
    <body
      className={
        classNames(
          iconography.variable,
          barlowCondensed.variable,
          roboto.variable,
        )
      }
    >
    <Script
      src="https://telegram.org/js/telegram-web-app.js"
      strategy="afterInteractive"
    />
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
    >
      <Telegram />
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
        {/*<Script*/}
        {/*  src="https://accounts.google.com/gsi/client"*/}
        {/*  strategy="lazyOnload"*/}
        {/*/>*/}
      </FavoritesProvider>
    </NextIntlClientProvider>
    </body>
    </html>
  )
}
