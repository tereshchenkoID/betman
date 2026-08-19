'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from '@/i18n/routing'
import { loginWithTelegramAction } from '@/app/actions/auth'
import useTelegram from '@/hooks/useTelegram'

export default function Telegram() {
  const router = useRouter()

  const { initData, user } = useTelegram()
  const tgSetupDone = useRef(false)
  const authRequested = useRef(false)

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

      // cleanup для Strict Mode
      return () => {
        tgObject.offEvent('viewportChanged', updateLayout)
        tgObject.offEvent('safeAreaChanged', updateLayout)
      }
    }
  }, [])

  useEffect(() => {
    if (authRequested.current) return        // уже звали
    if (!user?.id || !initData) return       // ждём реальные данные из TG

    const tgObject = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
    const isInsideTelegram = tgObject && tgObject.platform !== 'unknown'
    if (!isInsideTelegram) return

    authRequested.current = true             // ← блокируем повторные вызовы


    const handleAuth = async () => {
      // const tgObject = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
      // const isInsideTelegram = tgObject && tgObject.platform !== 'unknown'

      // if (!isInsideTelegram) return

      try {
        const res = await loginWithTelegramAction(user)

        if (res?.token) {
          router.refresh()
        }
      } catch (e) {
        console.error('Telegram auth error:', e)
        authRequested.current = false
      }
    }

    handleAuth().catch()
  }, [initData, user, router])

  return null
}
