import Link from 'next/link'

import { NAVIGATION } from '@/constant/config'

import style from './index.module.scss'

const Logo = () => {
  return (
    <Link
      href={NAVIGATION.home.url}
      rel="noreferrer"
      className={style.block}
      aria-label="Logo"
    >
      <picture>
        <source media="(max-width: 1279px)" srcSet={'/images/logo-mobile.svg'} />
        <img
          srcSet={'/images/logo-desktop.svg'}
          width={30}
          height={30}
          alt={'Logo'}
          loading={'eager'}
        />
      </picture>
    </Link>
  )
}

export default Logo
