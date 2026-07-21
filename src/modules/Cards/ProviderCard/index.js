import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import style from './index.module.scss'

const ProviderCard = ({ data }) => {
  const { closeModal } = useModal()
  const pathname = usePathname()
  const isActive = Boolean(data?.slug && pathname.includes(data.slug))

  return (
    <Link
      href={data.link || `${NAVIGATION.games_hall.url}/${data.slug}`}
      className={
        classNames(
          style.block,
          isActive && style.active
        )
      }
      onClick={() => closeModal()}
      aria-label={data.name}
    >
      {
        data.image &&
        <div className={style.picture}>
          {
            data.image &&
            <Image
              src={data?.image}
              className={style.image}
              alt={data?.name || 'Provider image'}
              width={70}
              height={40}
              decoding="async"
            />
          }
        </div>
      }
    </Link>
  )
}

export default ProviderCard
