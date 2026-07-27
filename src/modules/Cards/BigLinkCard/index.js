import { Link } from '@/i18n/routing'
import Image from 'next/image'

import style from './index.module.scss'

const BigLinkCard = ({ data }) => {
  return (
    <Link
      href={`/${data?.hasMore?.join('/')}`}
      className={style.block}
      aria-label={data?.title}
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
        />
      }
      <p className={style.title}>{data?.title}</p>
    </Link>
  )
}

export default BigLinkCard
