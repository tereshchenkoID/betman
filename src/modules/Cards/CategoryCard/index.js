import clsx from 'clsx'

import { Link, usePathname } from '@/i18n/navigation'

import { NAVIGATION } from '@/constant/config'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const CategoryCard = ({ data }) => {
  const pathname = usePathname()
  const { icon, title, link, slug } = data

  return (
    <Link
      href={link || `${NAVIGATION.games_hall.url}/${slug}`}
      className={
        clsx(
          style.block,
          {
            [style.active]: Boolean(slug && pathname.includes(slug)) && style.active
          }
        )
      }
      aria-label={title || slug}
      prefetch={false}
    >
      { icon && <Icon name={icon} /> }
      <p className={style.text}>{title}</p>
    </Link>
  )
}

export default CategoryCard
