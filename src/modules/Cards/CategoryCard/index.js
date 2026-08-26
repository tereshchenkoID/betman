import { Link, usePathname } from '@/i18n/navigation'
import clsx from 'clsx'

import { NAVIGATION } from '@/constant/config'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const CategoryCard = ({ data }) => {
  const pathname = usePathname()
  const isActive = Boolean(data?.slug && pathname.includes(data.slug))

  return (
    <Link
      href={data.link || `${NAVIGATION.games_hall.url}/${data.slug}`}
      className={
        clsx(
          style.block,
          isActive && style.active
        )
      }
      aria-label={data.title}
      prefetch={false}
    >
      {
        data?.icon &&
        <Icon name={data?.icon} />
      }
      <p className={style.text}>{data.title}</p>
    </Link>
  )
}

export default CategoryCard
