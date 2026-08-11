import { useState, useEffect } from 'react'

const useTelegramWebApp = () => {
  const [tg, setTg] = useState(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      return window.Telegram.WebApp
    }
    return null
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp
      webApp.ready()
      setTg(webApp)
    }
  }, [])

  return tg
}

export default useTelegramWebApp
