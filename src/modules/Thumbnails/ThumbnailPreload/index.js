import Image from 'next/image'

import style from './index.module.scss'

const ThumbnailPreload = ({ settings }) => {
  return (
    <div className={style.block}>
      <Image
        src={settings.assets.logo_desktop}
        className={style.image}
        alt={settings.name}
        width={187}
        height={40}
        decoding="async"
        sizes="187px"
      />
    </div>
  )
}

export default ThumbnailPreload
