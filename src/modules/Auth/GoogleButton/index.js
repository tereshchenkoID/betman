'use client'

import { useEffect, useState } from 'react'

import { useRouter } from '@/i18n/routing'
import { useModal } from '@/context/ModalContext'
import { loginWithGoogleAction } from '@/app/actions/auth'

import Action from '@/components/Action'

export default function GoogleButton() {
  const router = useRouter()
  const { closeModal } = useModal()
  const [isSdkLoaded, setIsSdkLoaded] = useState(false)

  useEffect(() => {
    let client

    const initGoogleTokenClient = () => {
      if (window.google?.accounts?.oauth2) {
        setIsSdkLoaded(true)

        client = window.google.accounts.oauth2.initTokenClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          scope: 'openid profile email',
          callback: async (tokenResponse) => {
            if (tokenResponse?.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                })
                const userData = await res.json()

                if (userData?.email) {
                  const result = await loginWithGoogleAction({
                    email: userData.email,
                    name: userData.name || 'Google User',
                    picture: userData.picture || ''
                  })

                  if (result.success) {
                    closeModal()
                    router.push('/')
                    router.refresh()
                  } else {
                    alert(result.error)
                  }
                }
              } catch (error) {
                console.error('Ошибка получения данных профиля:', error)
              }
            }
          },
        })

        window._googleTokenClient = client
      }
    }

    if (window.google) {
      initGoogleTokenClient()
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          initGoogleTokenClient()
          clearInterval(interval)
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [router])

  const handleGoogleLogin = () => {
    if (window._googleTokenClient) {
      window._googleTokenClient.requestAccessToken({ prompt: 'select_account' })
    } else {
      console.error('Google Token Client еще не инициализирован')
    }
  }

  return (
    <Action
      classes={['primary', 'lg']}
      icon={'google'}
      placeholder="Google"
      disabled={!isSdkLoaded}
      onChange={handleGoogleLogin}
    />
  )
}
