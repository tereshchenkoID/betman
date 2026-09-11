'use client'

import { startTransition, useEffect } from 'react'
import { useTranslations } from 'next-intl'

import { useRouter } from '@/i18n/navigation'

import { useModal } from '@/context/ModalContext'
import { useWebSocketContext } from '@/context/WebSocketContext'
import { useUser } from '@/hooks/useUser'
import { eventBus } from '@/utils/eventBus'

const WSUpdater = ({ user }) => {
  const t = useTranslations()
  const { isAuth, profile } = useUser()
  const router = useRouter()
  const { lastMessage } = useWebSocketContext()
  const { openModal } = useModal()

  useEffect(() => {
    if (!lastMessage) return

    const { cmd, data, topic } = lastMessage

    if (cmd === 'update' && topic === 'credits') {
      startTransition(async () => {
        eventBus.emit(`ws:${topic}`, data)
      })
    }

    if (cmd === 'update' && topic === 'message') {
      openModal('notification', { data }, { title: data?.title || '' })
    }

    if (topic === 'analytics') {
      window.dataLayer.push(data)
    }
  }, [lastMessage, router, openModal])

  useEffect(() => {
    const hasBirthday = profile?.birthday
    const hasAgeSession = typeof window !== 'undefined' && localStorage.getItem('age') === '1'

    let shouldShowModal = false

    if (isAuth) {
      if (!hasBirthday && !hasAgeSession) {
        shouldShowModal = true
      }
    } else {
      if (!hasAgeSession) {
        shouldShowModal = true
      }
    }

    if (shouldShowModal) {
      openModal('age', { }, { title: t('age.title'), isPointer: true })
    }
  }, [t, openModal, profile?.birthday, isAuth])

  return null
}

export default WSUpdater
