'use client'

import { memo } from 'react'
import style from './index.module.scss'

const Frame = ({ src, title }) => {
  if (!src) return null

  return (
    <div className={style.block}>
      <iframe
        src={src}
        title={String(title)}
        className={style.iframe}
        frameBorder="0"
        scrolling="auto"
        allow="autoplay *; screen-wake-lock *; fullscreen *"
      />
    </div>
  )
}

export default memo(Frame)
