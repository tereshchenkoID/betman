import { useState, useEffect } from 'react'

const useTelegramWebApp = () => {
  const [tg, setTg] = useState(null)

  useEffect(() => {
    const checkTg = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp
        webApp.ready()
        setTg(webApp)
      } else {
        setTimeout(checkTg, 100)
      }
    }

    checkTg()
  }, [])

  return tg
}

export default useTelegramWebApp
