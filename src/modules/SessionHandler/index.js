'use client'

import { startTransition, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { logoutAction } from '@/app/actions/auth'

import { usePathname, useRouter } from '@/i18n/navigation'

export default function SessionHandler() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isExpired = searchParams.get('expired') === '1'

  useEffect(() => {
    if (isExpired) {
      logoutAction().then(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('expired')

        const newQuery = params.toString() ? `?${params.toString()}` : ''

        startTransition(() => {
          router.replace(`${pathname}${newQuery}`, { scroll: false })
          router.refresh()
        })
      })
    }
  }, [pathname, searchParams, router, isExpired])

  return null
}
