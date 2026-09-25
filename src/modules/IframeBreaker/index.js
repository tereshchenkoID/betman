'use client'

import { useLayoutEffect } from 'react'

export default function IframeBreaker() {
  useLayoutEffect(() => {
    if (window.self !== window.top && window.parent) {
      // 1. Прячем DOM в iframe в момент layout
      document.documentElement.style.display = 'none'

      // 2. Отправляем сообщение родителю
      window.parent.postMessage(
        {
          type: 'PAYMENT_SUCCESS_REDIRECT',
          url: window.location.href,
        },
        '*'
      )
    }
  }, [])

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if (window.self !== window.top) {
            document.documentElement.style.display = 'none';
          }
        `,
      }}
    />
  )
}
