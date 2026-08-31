import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import clsx from 'clsx'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'
import { imageError } from '@/helpers/image'

import style from './index.module.scss'

const ProviderCard = ({ data }) => {
  const { closeAllModals } = useModal()

  return (
    <Link
      href={data.link || `${NAVIGATION.providers.url}/${data.slug}`}
      className={
        clsx(
          style.block,
          {
            [style.disabled]: data?.results === '0'
          }
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
            unoptimized
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
