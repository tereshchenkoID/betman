'use client'

import { useEffect, startTransition } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'

import { useWebSocketContext } from '@/context/WebSocketContext'
import { useModal } from '@/context/ModalContext'
import { revalidateAction } from '@/app/actions/revalidate'

const WSUpdater = ({ user }) => {
  const t = useTranslations()
  const router = useRouter()
  const { lastMessage } = useWebSocketContext()
  const { openModal } = useModal()

  useEffect(() => {
    if (!lastMessage) return

    const { cmd, data, topic } = lastMessage

    if (cmd === 'update' && topic === 'credits') {
      startTransition(async () => {
        await revalidateAction('user')
        router.refresh()
      })
    }

    if (cmd === 'update' && topic === 'tasks') {
      startTransition(async () => {
        await revalidateAction('quests')
        router.refresh()
      })
    }

    if (cmd === 'update' && topic === 'message') {
      openModal('notification', { data }, { title: data?.title || '' })
    }
  }, [lastMessage, router, openModal])

  useEffect(() => {
    const hasBirthday = user?.profile?.birthday
    const hasAgeSession = typeof window !== 'undefined' && localStorage.getItem('age') === '1'

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
      openModal('age', { }, { title: t('age.title'), isPointer: true })
    }
  }, [t, user, openModal])

  return null
}

export default WSUpdater
