'use client'

import { useEffect, useRef, memo } from 'react'

import style from './index.module.scss'

const Frame = ({ src, title }) => {
  const containerRef = useRef(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !src) return

    if (iframeRef.current && iframeRef.current.src === src) {
      return
    }

    containerRef.current.innerHTML = ''

    const iframe = document.createElement('iframe')
    iframe.src = src
    iframe.title = String(title)
    iframe.className = style.iframe
    iframe.setAttribute('frameBorder', '0')
    iframe.setAttribute('scrolling', 'auto')
    iframe.setAttribute('allow', 'autoplay *; screen-wake-lock *; fullscreen *')

    iframeRef.current = iframe
    containerRef.current.appendChild(iframe)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      iframeRef.current = null
    }
  }, [src, title])

  return <div ref={containerRef} className={style.block} />
}

export default memo(Frame, (prev, next) => prev.src === next.src)
