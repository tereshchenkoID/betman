'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'

import { imageError } from '@/helpers/image'

import style from './index.module.scss'

const SectionMainBannerSlider = ({ mock }) => {
  const { title, data } = mock
  const { link, mob, desk } = data

  if (!link) return null

  return (
    <Link
      href={link}
      className={style.block}
    >
      <Image
        src={mob}
        alt={title}
        className={style.mob}
        width={664}
        height={570}
        decoding="async"
        onError={(e) => imageError(e, false)}
        unoptimized
      />
      <Image
        src={desk}
        alt={title}
        className={style.desk}
        width={1184}
        height={216}
        decoding="async"
        onError={(e) => imageError(e, false)}
        unoptimized
      />
    </Link>
  )
}

export default SectionMainBannerSlider
