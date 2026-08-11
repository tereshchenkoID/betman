import { useMemo } from 'react'
import useTelegramWebApp from './useTelegramWebApp'

const useTelegram = () => {
  const tg = useTelegramWebApp()

  return useMemo(() => {
    const webApp = tg || (typeof window !== 'undefined' ? window.Telegram?.WebApp : null)

    return {
      tg: webApp,
      user: webApp?.initDataUnsafe?.user || null,
      initData: webApp?.initData || '',
      platform: webApp?.platform || 'unknown',
      colorScheme: webApp?.colorScheme || 'dark',
    }
  }, [tg, tg?.initData, tg?.initDataUnsafe?.user])
}

export default useTelegram
