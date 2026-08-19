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
//         }
//       } catch (e) {
//         console.error('Telegram auth error:', e)
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

export default function Telegram() {
  const router = useRouter()
  const { initData, user } = useTelegram()

  const tgSetupDone = useRef(false)
  const isAuthProcessing = useRef(false) // Защита от дубликатов на время жизни компонента

  // 1. Инициализация UI Telegram WebApp
  useEffect(() => {
    if (tgSetupDone.current) return

    const tgObject = typeof window !== 'undefined' ? window.Telegram?.WebApp : null

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
  }, [])

  // 2. Авторизация (Выполняется строго 1 раз)
  useEffect(() => {
    const handleAuth = async () => {
      const tgObject = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
      const isInsideTelegram = tgObject && tgObject.platform !== 'unknown'

      // Проверяем, авторизовывались ли мы в этой сессии
      const alreadyAuthed = sessionStorage.getItem('tg_auth_success')

      if (!isInsideTelegram || !user || isAuthProcessing.current || alreadyAuthed) {
        return
      }

      isAuthProcessing.current = true

      try {
        const res = await loginWithTelegramAction(user)

        if (res?.token) {
          sessionStorage.setItem('tg_auth_success', 'true')
          router.refresh()
        } else {
          isAuthProcessing.current = false
        }
      } catch (e) {
        console.error('Telegram auth error:', e)
        isAuthProcessing.current = false
      }
    }

    handleAuth()
  }, [user, router])

  return null
}
