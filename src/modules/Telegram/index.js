// 'use client'
//
// import { useEffect, useRef } from 'react'
// import { useRouter } from '@/i18n/routing'
// import { loginWithTelegramAction } from '@/app/actions/auth'
// import useTelegram from '@/hooks/useTelegram'
//
// export default function Telegram() {
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
//     if (!user?.id || !initData) return
//
//     const tgObject = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
//     const isInsideTelegram = tgObject && tgObject.platform !== 'unknown'
//     if (!isInsideTelegram) return
//
//     if (sessionStorage.getItem('tg_auth_sent')) return
//     sessionStorage.setItem('tg_auth_sent', 'true')
//
//     const handleAuth = async () => {
//       const tgObject = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
//       const isInsideTelegram = tgObject && tgObject.platform !== 'unknown'
//
//       if (!isInsideTelegram) return
//
//       try {
//         const res = await loginWithTelegramAction(user)
//
//         if (res?.token) {
//           router.refresh()
//         } else {
//           sessionStorage.removeItem('tg_auth_sent')
//         }
//       } catch (e) {
//         console.error('Telegram auth error:', e)
//         sessionStorage.removeItem('tg_auth_sent')
//       }
//     }
//
//     handleAuth().catch()
//   }, [initData, user, router])
//
//   return null
// }


'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from '@/i18n/routing'
import { loginWithTelegramAction } from '@/app/actions/auth'
import useTelegram from '@/hooks/useTelegram'

let isAuthDone = false

export default function Telegram() {
  const router = useRouter()
  const { user, initData } = useTelegram()
  const layoutInited = useRef(false)

  // 1. Инициализация UI Telegram (Запускается строго 1 раз и изолирована от React)
  useEffect(() => {
    if (layoutInited.current) return

    const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
    if (!tg) return

    layoutInited.current = true

    tg.ready()
    tg.expand()

    const updateLayout = () => {
      if (tg.isVersionAtLeast('8.0') && !tg.isFullscreen) {
        try { tg.requestFullscreen() } catch (e) {}
      }

      let top = tg.contentSafeAreaInset?.top || tg.safeAreaInset?.top || tg.viewport?.offsetTop || 0
      const bottom = tg.contentSafeAreaInset?.bottom || tg.safeAreaInset?.bottom || 0
      const height = tg.viewportStableHeight || tg.viewport?.height || window.innerHeight

      if (tg.platform === 'ios') top += 60
      if (tg.platform === 'android') top += 30

      document.documentElement.style.setProperty('--tg-safe-top', `${top}px`)
      document.documentElement.style.setProperty('--tg-safe-bottom', `${bottom}px`)
      document.documentElement.style.setProperty('--tg-viewport-height', `${height}px`)
    }

    // Небольшой debounced-вызов для UI, чтобы не спамить ререндерами
    updateLayout()

    if (tg.isVersionAtLeast('7.7')) {
      tg.disableVerticalSwipes()
    }

    tg.onEvent('viewportChanged', updateLayout)
    tg.onEvent('safeAreaChanged', updateLayout)

    return () => {
      tg.offEvent('viewportChanged', updateLayout)
      tg.offEvent('safeAreaChanged', updateLayout)
    }
  }, [])

  // 2. Авторизация — с задержкой в 1 тик Event Loop для стабилизации WebApp
  useEffect(() => {
    if (!user?.id || !initData || isAuthDone) return

    const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
    if (!tg || tg.platform === 'unknown') return

    isAuthDone = true

    // setTimeout на 50ms дает Telegram SDK дострелять свои первичные viewportChanged
    // и позволяет React завершить первичную гидратацию
    const timer = setTimeout(async () => {
      try {
        const res = await loginWithTelegramAction(user)
        if (res?.token) {
          router.refresh()
        } else {
          isAuthDone = false
        }
      } catch (e) {
        console.error('Telegram auth error:', e)
        isAuthDone = false
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [user?.id, initData, router])

  return null
}
