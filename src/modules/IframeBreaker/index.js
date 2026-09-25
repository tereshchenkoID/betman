'use client'

import { useEffect } from 'react'

export default function IframeBreaker() {
  useEffect(() => {
    if (window.self !== window.top && window.parent) {
      window.parent.postMessage(
        {
          type: 'PAYMENT_SUCCESS_REDIRECT',
          url: window.location.href,
        },
        '*'
      )
    }
  }, [])

  return null
}
