import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'
import { imageError } from '@/helpers/image'

import style from './index.module.scss'

const ProviderCard = ({ data }) => {
  const pathname = usePathname()
  const isActive = Boolean(data?.slug && pathname.includes(data.slug))
  const { closeAllModals } = useModal()

  return (
    <Link
      href={data.link || `${NAVIGATION.providers.url}/${data.slug}`}
      className={
        classNames(
          style.block,
          isActive && style.active
        )
      }
      onClick={closeAllModals}
      aria-label={data.name}
      prefetch={false}
    >
      {
        data.image &&
        <div className={style.picture}>
          <Image
            src={data?.image}
            alt={data?.name || 'Provider image'}
            fill
            decoding="async"
            sizes="70px"
            onError={(e) => imageError(e, false)}
            unoptimized={true}
          />
        </div>
      }
      <div className={style.content}>
        <p>{data?.title}</p>
        <strong className={style.count}>{data?.results}</strong>
      </div>
    </Link>
  )
}

export default ProviderCard
