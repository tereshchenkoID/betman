'use client'

import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { toast } from '@/utils/toast'

import { useModal } from '@/context/ModalContext'
import { action } from './action'

import style from './index.module.scss'

const baseLayoutWidth = 500

const WHEEL_CONFIG = {
  colors: ['#141517', '#004654', '#01B0CF'],

  ratios: {
    outerBorder: 13 / baseLayoutWidth,
    innerRingRadius: 80 / baseLayoutWidth,
    innerBorderWidth: 8 / baseLayoutWidth,
    separatorLineWidth: 3 / baseLayoutWidth,
    separatorLineColor: '#F5B51A',
    textRadiusDistance: 0.82,
  },

  text: {
    titleSize: '50px',
    valueSize: '38px',
    valueAlpha: 'rgba(255, 255, 255, 0.8)',
    lineHeightGap: 50,
  },

  shadows: {
    outerBlur: 15,
    outerColor: 'rgba(0, 0, 0, 0.6)',
    innerBlur: 20,
    innerColor: 'rgba(0, 0, 0, 0.8)',
  },

  goldGradientStops: [
    { offset: 0.0, color: '#FFA800' },
    { offset: 0.1, color: '#E69007' },
    { offset: 0.2, color: '#FFE871' },
    { offset: 0.3, color: '#FFF088' },
    { offset: 0.5, color: '#EF9A0E' },
    { offset: 0.7, color: '#894400' },
    { offset: 0.8, color: '#914A00' },
    { offset: 0.9, color: '#FDB500' },
    { offset: 1.0, color: '#AE5F00' },
  ],
}

const darkenColor = (hex, percent) => {
  let num = parseInt(hex.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00ff) - amt,
    B = (num & 0x0000ff) - amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 0 ? 0 : R > 255 ? 255 : R) * 0x1000 +
      (G < 0 ? 0 : G > 255 ? 255 : G) * 0x10 +
      (B < 0 ? 0 : B > 255 ? 255 : B)
    )
      .toString(16)
      .slice(1)
  )
}

const Wheel = ({ mock, user, wheelsRound }) => {
  const router = useRouter()
  const t = useTranslations()
  const { wheels, wheelsCounter } = wheelsRound
  const { openModal } = useModal()

  const canvasRef = useRef(null)
  const timerRef = useRef(null)
  const rotationRef = useRef(0)

  const [spinning, setSpinning] = useState(false)

  const count = mock?.length || 0
  const angleStep = 360 / count

  const OPTIONS = useMemo(
    () => ({
      angleStep,
      canSpin: !spinning && wheelsCounter > 0,
    }),
    [spinning, wheelsCounter, angleStep]
  )

  const drawCanvasFrame = (currentRotation) => {
    const canvas = canvasRef.current
    if (!canvas || count === 0) return

    const ctx = canvas.getContext('2d')
    const size = canvas.width
    const center = size / 2

    const rootStyles = getComputedStyle(document.documentElement)
    const colorWhite = rootStyles.getPropertyValue('--color-white').trim() || '#ffffff'
    const fontFamily = rootStyles.getPropertyValue('--font-family').trim() || "'Roboto', sans-serif"
    const fontFamilyAlt = rootStyles.getPropertyValue('--font-family-alt').trim() || "'Oswald', sans-serif"

    const outerBorderWidth = size * WHEEL_CONFIG.ratios.outerBorder
    const radius = center - outerBorderWidth

    ctx.clearRect(0, 0, size, size)

    // Sector & Text
    mock.forEach((sector, i) => {
      const startAngle = ((i * angleStep + currentRotation - 90) * Math.PI) / 180
      const endAngle = (((i + 1) * angleStep + currentRotation - 90) * Math.PI) / 180
      const middleAngle = startAngle + (endAngle - startAngle) / 2

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(center, center)
      ctx.arc(center, center, radius, startAngle, endAngle)
      ctx.closePath()

      const baseColor = WHEEL_CONFIG.colors[i % WHEEL_CONFIG.colors.length]
      const grad = ctx.createRadialGradient(center, center, radius * 0.25, center, center, radius)
      grad.addColorStop(0, baseColor)
      grad.addColorStop(1, darkenColor(baseColor, 40))

      ctx.fillStyle = grad
      ctx.fill()
      ctx.restore()

      // Text Render
      ctx.save()
      ctx.translate(center, center)
      ctx.rotate(middleAngle + Math.PI / 2)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const titleText = sector.title.toUpperCase()
      const valueText = sector.value ? sector.value.toUpperCase() : ''

      ctx.fillStyle = colorWhite
      ctx.font = `700 ${WHEEL_CONFIG.text.titleSize} ${fontFamilyAlt}`
      const mainTextY = -radius * WHEEL_CONFIG.ratios.textRadiusDistance
      ctx.fillText(titleText, 0, mainTextY)

      if (valueText) {
        ctx.fillStyle = WHEEL_CONFIG.text.valueAlpha
        ctx.font = `600 ${WHEEL_CONFIG.text.valueSize} ${fontFamily}`
        ctx.fillText(valueText, 0, mainTextY + WHEEL_CONFIG.text.lineHeightGap)
      }
      ctx.restore()
    })

    // Separators
    mock.forEach((_, i) => {
      const lineAngle = ((i * angleStep + currentRotation - 90) * Math.PI) / 180
      ctx.save()
      ctx.beginPath()
      ctx.strokeStyle = WHEEL_CONFIG.ratios.separatorLineColor
      ctx.lineWidth = size * WHEEL_CONFIG.ratios.separatorLineWidth
      ctx.moveTo(center, center)
      ctx.lineTo(center + radius * Math.cos(lineAngle), center + radius * Math.sin(lineAngle))
      ctx.stroke()
      ctx.restore()
    })

    // Gold Frame
    ctx.save()
    ctx.beginPath()
    ctx.arc(center, center, center - outerBorderWidth / 2, 0, Math.PI * 2)
    ctx.lineWidth = outerBorderWidth

    const goldGrad = ctx.createRadialGradient(center, center, radius * 0.5, center, center, center)
    WHEEL_CONFIG.goldGradientStops.forEach((stop) => goldGrad.addColorStop(stop.offset, stop.color))

    ctx.strokeStyle = goldGrad
    ctx.shadowBlur = WHEEL_CONFIG.shadows.outerBlur
    ctx.shadowColor = WHEEL_CONFIG.shadows.outerColor
    ctx.stroke()
    ctx.restore()
  }

  // Первоначальный рендер при готовности шрифтов
  useEffect(() => {
    document.fonts.ready.then(() => {
      drawCanvasFrame(rotationRef.current)
    })
  }, [mock, count, angleStep])

  const handleButtonClick = async () => {
    if (!user?.id) {
      openModal('login', {}, { title: t('sign_up') })
      return
    }

    if (!OPTIONS.canSpin) return
    setSpinning(true)

    const hashesArray = wheels?.data || []
    const currentHashIndex = hashesArray.length - wheelsCounter
    const currentHash = hashesArray[currentHashIndex]?.hash

    if (!currentHash) {
      setSpinning(false)
      return
    }

    const res = await action(currentHash)

    if (res.code === '0') {
      animateWheel(res?.data)
    } else {
      setSpinning(false)
      toast.error(res?.error_message)
    }
  }

  const animateWheel = (data) => {
    const duration = data?.time * 1000
    const startTimestamp = performance.now()
    const startRotation = rotationRef.current
    const sectorCenter = data?.id * angleStep + angleStep / 2
    const targetAngle = 360 - sectorCenter
    const extraSpins = Math.max(2, Math.floor(data?.time * 0.7)) * 360
    const finalRotation =
      startRotation +
      extraSpins +
      (targetAngle - (startRotation % 360) + (targetAngle - (startRotation % 360) < 0 ? 360 : 0))

    const step = (timestamp) => {
      const elapsed = timestamp - startTimestamp
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 4)
      const currentRot = startRotation + (finalRotation - startRotation) * easeOut

      rotationRef.current = currentRot
      drawCanvasFrame(currentRot)

      if (progress < 1) {
        timerRef.current = requestAnimationFrame(step)
      } else {
        setSpinning(false)
        toast.success(data?.info)
        router.refresh()
      }
    }
    timerRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current)
    }
  }, [])

  return (
    <div className={style.block}>
      <div className={style.indicator}>
        <Image
          src="/images/wheels/indicator.svg"
          alt="Indicator"
          width={80}
          height={105}
          unoptimized
        />
      </div>

      <div className={style.frame}>
        <canvas ref={canvasRef} width={1200} height={1200} className={style.canvas} />
      </div>
      <button
        type="button"
        className={style.spin}
        onClick={handleButtonClick}
        disabled={user?.id && !OPTIONS.canSpin}
      >
        <Image
          className={style.logo}
          src="/images/logo-mobile.svg"
          width={102}
          height={35}
          alt="Logo"
          unoptimized
        />
      </button>
    </div>
  )
}

export default Wheel
