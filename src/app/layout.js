// import Script from 'next/script'
import localFont from 'next/font/local'
// import { preload } from 'react-dom'
import { Inter, Roboto_Condensed } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import classNames from 'classnames'

import 'keen-slider/keen-slider.min.css'
// import 'react-phone-input-2/lib/style.css'

import './layout.scss'
import './icons.scss'

const robotoCondensed = Roboto_Condensed({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-alt',
})

const inter = Inter({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family',
})

const iconography = localFont({
  src: '../../public/fonts/iconography.woff2',
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

export default function RootLayout({ children }) {
  // preload('/images/coins.webp', { as: 'image', type: 'image/webp' })
  // preload('/images/no_avatar.webp', { as: 'image', type: 'image/webp' })
  // preload('/images/thumbnail_more_games_2x3.webp', { as: 'image', type: 'image/webp' })
  // preload('/images/invite_friend.webp', { as: 'image', type: 'image/webp' })
  // preload('/images/wheels/background.webp', { as: 'image', type: 'image/webp' })
  // preload('/images/wheels/indicator.svg', { as: 'image', type: 'image/svg+xml' })

  return (
    <html lang="en">
    <body
      className={
        classNames(
          iconography.variable,
          inter.variable,
          robotoCondensed.variable,
        )
      }
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
      {children}
      {/*<Script*/}
      {/*  src="https://telegram.org/js/telegram-web-app.js?v=2026_v2"*/}
      {/*  strategy="beforeInteractive"*/}
      {/*/>*/}
      {/*<Script*/}
      {/*  src="https://accounts.google.com/gsi/client"*/}
      {/*  strategy="lazyOnload"*/}
      {/*/>*/}
    </body>
    </html>
  )
}
