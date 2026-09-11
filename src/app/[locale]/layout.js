import { Suspense } from 'react'
import { preconnect, preload } from 'react-dom'
import { Oswald, Roboto } from 'next/font/google'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import { GoogleTagManager } from '@next/third-parties/google'
import clsx from 'clsx'
import * as fs from 'node:fs'
import path from 'path'

import { getCachedUser, getFavorites } from '@/app/actions/static'

import { FavoritesProvider } from '@/context/FavoritesContext'
import { UserStoreProvider } from '@/context/UserContext'
import { WebSocketProvider } from '@/context/WebSocketContext'

import ScrollToTop from '@/modules/ScrollToTop'
import SessionHandler from '@/modules/SessionHandler'
import Telegram from '@/modules/Telegram'
import WSUpdater from '@/modules/WSUpdater'
import Modals from '@/widgets/Modals/Modals'
import Toastify from '@/widgets/Toastify'

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
  title: {
    default: `Play with ${process.env.ORGANIZATION_NAME}`,
    template: `%s | ${process.env.ORGANIZATION_NAME}`,
  },
  description: 'Page not found',
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

const spritePath = path.resolve(process.cwd(), 'public/images/iconography.svg')
const svgSpriteContent = fs.readFileSync(spritePath, 'utf8')

export default async function RootLayout({ children, params }) {
  preload('/images/logo/logo-desktop.svg', { as: 'image', type: 'image/svg+xml' })
  preconnect('https://www.googletagmanager.com')
  preconnect('https://telegram.org')

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
    <Script
      src="https://telegram.org/js/telegram-web-app.js"
      strategy="beforeInteractive"
    />
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
    >
      <div
        style={{ display: 'none' }}
        dangerouslySetInnerHTML={{ __html: svgSpriteContent }}
      />
      <Telegram auth={user} />
      <Suspense fallback={null}>
        <SessionHandler />
      </Suspense>
      <UserStoreProvider user={user}>
        <FavoritesProvider
          user={user}
          data={favorites?.data}
          meta={favorites?.meta}
        >
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
            <WebSocketProvider user={user}>
              {children}
              <WSUpdater user={user} />
            </WebSocketProvider>
          <Modals />
          <Toastify />
        </FavoritesProvider>
      </UserStoreProvider>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </NextIntlClientProvider>
    </body>
    </html>
  )
}
