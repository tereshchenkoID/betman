import useTelegramWebApp from './useTelegramWebApp'

const useTelegram = () => {
  const tg = useTelegramWebApp()

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    initData: tg?.initData,
    platform: tg?.platform,
    colorScheme: tg?.colorScheme,
  }
}

export default useTelegram
