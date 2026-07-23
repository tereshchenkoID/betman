'use client'

import { useEffect } from 'react'

export default function LogoutCleanupPage() {
  useEffect(() => {
    window.location.href = '/'
  }, [])

  return null
}
