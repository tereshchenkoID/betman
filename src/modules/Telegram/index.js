// 'use client'
//
// import { useEffect, useRef } from 'react'
// import { useRouter } from '@/i18n/routing'
// import { loginWithTelegramAction } from '@/app/actions/auth'
// import useTelegram from '@/hooks/useTelegram'
//
// export default function Telegram({ auth }) {
//   const router = useRouter()
//
//   const { initData, user } = useTelegram()
//   const tgSetupDone = useRef(false)
//
//   useEffect(() => {
//     if (tgSetupDone.current) return
//
//     const tgObject = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
//
//     if (tgObject) {
//       tgObject.ready()
//       tgObject.expand()
//
//       const updateLayout = () => {
//         if (tgObject.isVersionAtLeast('8.0') && !tgObject.isFullscreen) {
//           try {
//             tgObject.requestFullscreen()
//           } catch (e) {
//             console.error('Fullscreen request failed', e)
//           }
//         }
//
//         let top =
//           tgObject.contentSafeAreaInset?.top ||
//           tgObject.safeAreaInset?.top ||
//           tgObject.viewport?.offsetTop ||
//           0
//         const bottom =
//           tgObject.contentSafeAreaInset?.bottom ||
//           tgObject.safeAreaInset?.bottom ||
//           0
//         const height =
//           tgObject.viewportStableHeight ||
//           tgObject.viewport?.height ||
//           window.innerHeight
//
//         if (tgObject.platform === 'ios') top += 60
//         if (tgObject.platform === 'android') top += 30
//
//         document.documentElement.style.setProperty('--tg-safe-top', `${top}px`)
//         document.documentElement.style.setProperty('--tg-safe-bottom', `${bottom}px`)
//         document.documentElement.style.setProperty('--tg-viewport-height', `${height}px`)
//       }
//
//       setTimeout(() => {
//         updateLayout()
//         if (tgObject.isVersionAtLeast('8.0')) {
//           tgObject.requestFullscreen()
//         }
//       }, 100)
//
//       tgObject.onEvent('viewportChanged', updateLayout)
//       tgObject.onEvent('safeAreaChanged', updateLayout)
//
//       if (tgObject.isVersionAtLeast('7.7')) {
//         tgObject.disableVerticalSwipes()
//       }
//
//       tgSetupDone.current = true
//     }
//   }, [])
//
//   useEffect(() => {
//     if (auth?.id) return
//     if (!initData) return
//
//     const tgObject = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
//     const isInsideTelegram = tgObject && tgObject.platform !== 'unknown'
//
//     if (!isInsideTelegram) return
//
//     const handleAuth = async () => {
//       try {
//         const res = await loginWithTelegramAction(user)
//
//         if (res?.token) {
//           router.refresh()
//         }
//       } catch (e) {
//         console.error('Telegram auth error:', e)
//       }
//     }
//
//     handleAuth().catch()
//   }, [initData, user, router, auth?.id])
//
//   return null
// }


'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { loginWithTelegramAction } from '@/app/actions/auth'
import useTelegram from '@/hooks/useTelegram'

export default function Telegram({ auth }) {
  const router = useRouter()
  const { initData, user } = useTelegram()

  // Начальное состояние считываем сразу при маунте
  const [isScriptLoaded, setIsScriptLoaded] = useState(() => {
    if (typeof window !== 'undefined') {
      return Boolean(window.Telegram?.WebApp)
    }
    return false
  })
  const tgSetupDone = useRef(false)

  useEffect(() => {
    if (auth?.session_type !== 'tma') return
    if (isScriptLoaded) return // Если уже загружен — ничего не делаем

    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-web-app.js'
    script.async = true
    script.onload = () => setIsScriptLoaded(true)
    script.onerror = (e) => console.error('Failed to load Telegram SDK', e)

    document.head.appendChild(script)
  }, [auth?.session_type, isScriptLoaded])

  // 2. Инициализация UI и SAFE-AREAS (запускается ТОЛЬКО после загрузки скрипта)
  useEffect(() => {
    if (!isScriptLoaded || tgSetupDone.current) return

    const tgObject = window.Telegram?.WebApp

    if (tgObject) {
      tgObject.ready()
      tgObject.expand()

      const updateLayout = () => {
        if (tgObject.isVersionAtLeast('8.0') && !tgObject.isFullscreen) {
          try {
            tgObject.requestFullscreen()
          } catch (e) {
            console.error('Fullscreen request failed', e)
          }
        }

        let top =
          tgObject.contentSafeAreaInset?.top ||
          tgObject.safeAreaInset?.top ||
          tgObject.viewport?.offsetTop ||
          0
        const bottom =
          tgObject.contentSafeAreaInset?.bottom ||
          tgObject.safeAreaInset?.bottom ||
          0
        const height =
          tgObject.viewportStableHeight ||
          tgObject.viewport?.height ||
          window.innerHeight

        if (tgObject.platform === 'ios') top += 60
        if (tgObject.platform === 'android') top += 30

        document.documentElement.style.setProperty('--tg-safe-top', `${top}px`)
        document.documentElement.style.setProperty('--tg-safe-bottom', `${bottom}px`)
        document.documentElement.style.setProperty('--tg-viewport-height', `${height}px`)
      }

      setTimeout(() => {
        updateLayout()
        if (tgObject.isVersionAtLeast('8.0')) {
          tgObject.requestFullscreen()
        }
      }, 100)

      tgObject.onEvent('viewportChanged', updateLayout)
      tgObject.onEvent('safeAreaChanged', updateLayout)

      if (tgObject.isVersionAtLeast('7.7')) {
        tgObject.disableVerticalSwipes()
      }

      tgSetupDone.current = true
    }
  }, [isScriptLoaded])

  // 3. Авторизация пользоваля
  useEffect(() => {
    if (!isScriptLoaded) return
    if (auth?.id) return
    if (!initData) return

    const tgObject = window.Telegram?.WebApp
    const isInsideTelegram = tgObject && tgObject.platform !== 'unknown'

    if (!isInsideTelegram) return

    const handleAuth = async () => {
      try {
        const res = await loginWithTelegramAction(user)

        if (res?.token) {
          router.refresh()
        }
      } catch (e) {
        console.error('Telegram auth error:', e)
      }
    }

    handleAuth().catch()
  }, [isScriptLoaded, initData, user, router, auth?.id])

  return null
}
