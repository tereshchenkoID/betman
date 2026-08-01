'use client'

import { startTransition, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { logoutAction } from '@/app/actions/auth'

export default function SessionHandler() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('expired') === '1') {
      logoutAction().then(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('expired')

        const newQuery = params.toString() ? `?${params.toString()}` : ''
        router.replace(`${pathname}${newQuery}`)

        startTransition(() => {
          router.replace(`${pathname}${newQuery}`, { scroll: false })
          router.refresh()
        })
      })
    }
  }, [pathname, searchParams, router])

  return null
}
