'use client'

import { startTransition, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { usePathname, useRouter } from '@/i18n/navigation'

import { logoutAction } from '@/app/actions/auth'

import { useUserStore } from '@/hooks/useUser'

export default function SessionHandler() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const setUser = useUserStore((state) => state.setUser)
  const isExpired = searchParams.get('expired') === '1'

  useEffect(() => {
    if (isExpired) {
      const logoutHandle = async () => {
        const res = await logoutAction()

        if (res?.user) {
          setUser(res.user)
        }
      }

      logoutHandle().then(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('expired')

        const newQuery = params.toString() ? `?${params.toString()}` : ''

        startTransition(() => {
          router.replace(`${pathname}${newQuery}`, { scroll: false })
          router.refresh()
        })
      })
    }
  }, [pathname, searchParams, router, isExpired, setUser])

  return null
}
