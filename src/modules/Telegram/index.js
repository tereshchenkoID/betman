'use client'

import { useEffect, useRef } from 'react'

import { useRouter } from '@/i18n/navigation'

import { loginWithTelegramAction } from '@/app/actions/auth'

import useTelegram from '@/hooks/useTelegram'
import { useUserStore } from '@/hooks/useUser'

export default function Telegram({ auth }) {
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)

  const { initData, user } = useTelegram()
  const tgSetupDone = useRef(false)

  useEffect(() => {
    if (tgSetupDone.current) return

    const tgObject = typeof window !== 'undefined' ? window.Telegram?.WebApp : null

    if (tgObject) {
      tgObject.ready()
      tgObject.expand()

      if (tgObject.isVersionAtLeast('7.0')) {
        tgObject.disableVerticalSwipes?.()
      }

      const handleWindowScroll = () => {
        if (window.scrollY !== 0) {
          window.scrollTo(0, 0)
        }
      }

      window.addEventListener('scroll', handleWindowScroll)

      const updateLayout = () => {
        if (tgObject.isVersionAtLeast('8.0') && !tgObject.isFullscreen) {
          try {
            tgObject.requestFullscreen()
          } catch (e) {
            console.error('Fullscreen request failed', e)
          }
        }

        let top = tgObject.contentSafeAreaInset?.top || tgObject.safeAreaInset?.top || tgObject.viewport?.offsetTop || 0
        const bottom = tgObject.contentSafeAreaInset?.bottom || tgObject.safeAreaInset?.bottom || 0
        const height = tgObject.viewportStableHeight || window.innerHeight

        if (tgObject.platform === 'ios') top += 60
        if (tgObject.platform === 'android') top += 30

        document.documentElement.style.setProperty('--tg-safe-top', `${top}px`)
        document.documentElement.style.setProperty('--tg-safe-bottom', `${bottom}px`)
        document.documentElement.style.setProperty('--tg-viewport-height', `${height}px`)
        document.documentElement.style.setProperty('--screen-height', `${window.innerHeight}px`)
        document.documentElement.style.setProperty('--toastify-toast-top', `${top + 8}px`)

        window.scrollTo(0, 0)
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

  useEffect(() => {
    if (auth?.id) return
    if (!initData) return

    const tgObject = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
    const isInsideTelegram = tgObject && tgObject.platform !== 'unknown'

    if (!isInsideTelegram) return

    const handleAuth = async () => {
      // alert(JSON.stringify(user))
      const res = await loginWithTelegramAction(user)

      alert(JSON.stringify(res))

      if (res?.token) {
        setUser(res.user)
        router.refresh()
      }
    }

    handleAuth().then(() => {
      console.log('Success')
    })
  }, [initData, router, auth?.id, user, setUser])

  return null
}
