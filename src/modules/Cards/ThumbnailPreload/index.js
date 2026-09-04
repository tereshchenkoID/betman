import Image from 'next/image'

import style from './index.module.scss'

const ThumbnailPreload = () => {
  return (
    <div className={style.block}>
      <Image
        className={style.image}
        src="/images/logo-desktop.svg"
        width={145}
        height={36}
        alt="Logo"
        loading={'eager'}
        unoptimized
        priority
      />
    </div>
  )
}

export default ThumbnailPreload
