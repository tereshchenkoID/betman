import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

import { NAVIGATION } from '@/constant/config'

import style from './index.module.scss'

const ProviderCard = ({ data }) => {
  const pathname = usePathname()
  const isActive = Boolean(data?.slug && pathname.includes(data.slug))

  return (
    <Link
      href={data.link || `${NAVIGATION.providers.url}/${data.slug}`}
      className={
        classNames(
          style.block,
          isActive && style.active
        )
      }
      aria-label={data.name}
    >
      {
        data.image &&
        <div className={style.picture}>
          <Image
            src={data?.image}
            className={style.image}
            alt={data?.name || 'Provider image'}
            fill
            decoding="async"
            sizes="70px"
          />
        </div>
      }
      <div className={style.content}>
        <p className={style.title}>{data?.title}</p>
        <strong className={style.count}>{data?.results}</strong>
      </div>
    </Link>
  )
}

export default ProviderCard
