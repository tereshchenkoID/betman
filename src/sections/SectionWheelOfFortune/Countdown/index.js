import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'

import style from './index.module.scss'

const Countdown = ({ targetTimestamp, onExpire }) => {
  const t = useTranslations()

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    if (!targetTimestamp) return

    const targetTime = Number(targetTimestamp) < 1e11
      ? Number(targetTimestamp) * 1000
      : Number(targetTimestamp)

    const calculateTimeLeft = () => {
      const difference = targetTime - Date.now()

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        onExpire?.()
        return true
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / (1000 * 60)) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false })
      return false
    }

    const isDone = calculateTimeLeft()
    if (isDone) return

    const timer = setInterval(() => {
      const isDone = calculateTimeLeft()
      if (isDone) clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [targetTimestamp])

  const pad = (num) => String(num).padStart(2, '0')

  if (timeLeft.isExpired) {
    return null
  }

  return (
    <span className={style.block}>
      {
        timeLeft.days > 0 &&
        <>
          <span className={style.item}>
            <span>{timeLeft.days}</span>
            <span>{t('day')}</span>
          </span>
          <span>:</span>
        </>
      }

      <span>{pad(timeLeft.hours)}</span>
      <span className={style.divider}>:</span>
      <span>{pad(timeLeft.minutes)}</span>
      <span className={style.divider}>:</span>
      <span>{pad(timeLeft.seconds)}</span>
    </span>
  )
}

export default Countdown
