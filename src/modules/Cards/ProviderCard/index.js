import Image from 'next/image'
import clsx from 'clsx'

import { NAVIGATION } from '@/constant/config'

import { Link } from '@/i18n/navigation'
import { useModal } from '@/context/ModalContext'

import { imageError } from '@/helpers/image'

import style from './index.module.scss'

const ProviderCard = ({ data }) => {
  const { title, results, slug, image, name } = data
  const { closeAllModals } = useModal()

  return (
    <Link
      href={data.link || `${NAVIGATION.providers.url}/${slug}`}
      className={
        clsx(
          style.block,
          {
            [style.disabled]: data?.results === '0'
          }
        )
      }
      onClick={closeAllModals}
      aria-label={title || name}
      prefetch={false}
    >
      {
        image &&
        <div className={style.picture}>
          <Image
            src={image}
            alt={name || 'Provider image'}
            fill
            decoding="async"
            sizes="70px"
            onError={(e) => imageError(e, false)}
            unoptimized
          />
        </div>
      }
      <div className={style.content}>
        <p>{title}</p>
        <strong className={style.count}>{results}</strong>
      </div>
    </Link>
  )
}

export default ProviderCard
