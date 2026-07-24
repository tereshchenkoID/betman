import { useTranslations } from 'next-intl'
import { useState, useCallback } from 'react'

import { toast } from '@/utils/toast'

export const useCopy = () => {
  const t = useTranslations()
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text) => {
    if (!text) return false

    let success

    try {
      await navigator.clipboard.writeText(text)
      success = true
    } catch {
      try {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        textarea.style.pointerEvents = 'none'
        document.body.appendChild(textarea)

        textarea.focus()
        textarea.select()

        success = document.execCommand('copy')
        document.body.removeChild(textarea)
      } catch {
        success = false
      }
    }

    if (success) {
      setCopied(true)
      toast.success(t('notification.copy_success'));

      setTimeout(() => setCopied(false), 1200)
    } else {
      toast.error(t('notification.copy_error'));
    }

    return success
  }, [t])

  return { copy, copied }
}
