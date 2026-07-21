import Link from 'next/link'

import { NAVIGATION } from '@/constant/config'

import style from './index.module.scss'

const Logo = ({ settings }) => {
  return (
    <Link
      href={NAVIGATION.home.url}
      rel="noreferrer"
      className={style.block}
      aria-label="Logo"
    >
      <picture>
        <source media="(max-width: 1279px)" srcSet={settings.assets.logo_mobile} />
        <img
          srcSet={settings.assets.logo_desktop}
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
