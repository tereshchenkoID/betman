import { Link } from '@/i18n/navigation'
import Image from 'next/image'

import { imageError } from '@/helpers/image'

import style from './index.module.scss'

const BigLinkCard = ({ data }) => {
  return (
    <Link
      href={`/${data?.hasMore?.join('/')}`}
      className={style.block}
      prefetch={false}
    >
      {
        data?.image &&
        <Image
          src={data?.image}
          alt={data?.title}
          className={style.image}
          width={77}
          height={52}
          decoding="async"
          onError={(e) => imageError(e, false)}
          unoptimized
        />
      }
      <p>{data?.title}</p>
    </Link>
  )
}

export default BigLinkCard
