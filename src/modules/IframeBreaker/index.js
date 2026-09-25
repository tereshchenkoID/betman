'use client'

import { useEffect } from 'react'

export default function IframeBreaker() {
  useEffect(() => {
    if (window.self !== window.top) {
      window.top.location.href = window.location.href
    }
  }, [])

  return null
}
