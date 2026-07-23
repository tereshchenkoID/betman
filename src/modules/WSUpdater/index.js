'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'

import { useWebSocketContext } from '@/context/WebSocketContext'
import { useModal } from '@/context/ModalContext'

import NotificationModal from '@/modules/Modals/NotificationModal'
import AgeModal from '@/modules/Modals/AgeModal'

export default function WSUpdater({ user }) {
  const t = useTranslations()
  const router = useRouter()
  const { lastMessage } = useWebSocketContext()
  const { openModal } = useModal()

  useEffect(() => {
    if (!lastMessage) return

    const { cmd, data, topic } = lastMessage

    if (cmd === 'update' && (topic === 'credits' || topic === 'tasks')) {
      router.refresh()
    }

    if (cmd === 'update' && topic === 'message') {
      openModal({
        title: data?.title || '',
        body: <NotificationModal data={data} />
      })
    }
  }, [lastMessage, router, openModal])

  useEffect(() => {
    const hasBirthday = user?.profile?.birthday
    const hasAgeSession = typeof window !== 'undefined' && sessionStorage.getItem('age') === '1'

    let shouldShowModal = false

    if (user?.id) {
      if (!hasBirthday && !hasAgeSession) {
        shouldShowModal = true
      }
    } else {
      if (!hasAgeSession) {
        shouldShowModal = true
      }
    }

    if (shouldShowModal) {
      openModal({
        isPointer: true,
        title: t('age.title'),
        body: <AgeModal />
      })
    }
  }, [user, t, openModal])

  return null
}
