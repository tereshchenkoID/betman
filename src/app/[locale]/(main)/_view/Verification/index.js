'use client'

import { startTransition, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { apiRequest } from '@/app/actions/api'

import useModal from '@/hooks/useModal'

const Verification = () => {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const link = searchParams.get('verification')
  const { openModal } = useModal()

  useEffect(() => {
    if (!link) return

    const handleLoad = async () => {
      const res = await apiRequest('/profile/verification/', {
        method: 'POST',
        params: {
          code: link,
        }
      })

      if (res) openModal('email', { data: res }, { title: t('notification.verification_email') })
    }

    startTransition(() => {
      handleLoad().catch()
    })
  }, [link, openModal, t])
}

export default Verification
