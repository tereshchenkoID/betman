import Image from 'next/image'

import { NAVIGATION } from '@/constant/config'

import { Link } from '@/i18n/navigation'

import style from './index.module.scss'

const Logo = () => {
  return (
    <Link
      href={NAVIGATION.home.url}
      rel="noreferrer"
      className={style.block}
      aria-label="Logo"
    >
      <Image
        src="/images/logo-desktop.svg"
        width={145}
        height={36}
        alt="Logo"
        loading={'eager'}
        unoptimized
        priority
      />
    </Link>
  )
}

export default Logo
