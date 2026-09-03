import { Link } from '@/i18n/navigation'
import Image from 'next/image'

import { imageError } from '@/helpers/image'

import style from './index.module.scss'

const BigLinkCard = ({ data }) => {
  const { title, image, hasMore } = data

  return (
    <Link
      href={`/${hasMore.join('/')}`}
      className={style.block}
      prefetch={false}
    >
      {
        image &&
        <Image
          src={image}
          alt={title}
          className={style.image}
          width={77}
          height={52}
          decoding="async"
          onError={(e) => imageError(e, false)}
          unoptimized
        />
      }
      <p>{title}</p>
    </Link>
  )
}

export default BigLinkCard
