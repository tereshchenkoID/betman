import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const ThumbnailMore = ({ url }) => {
  const t = useTranslations()

  return (
    <Link
      href={url}
      className={style.block}
      aria-label={t('more_games')}
      prefetch={false}
    >
      <Image
        className={style.image}
        src="/images/thumbnail_more.webp"
        alt={t('more_games')}
        decoding="async"
        sizes="250px"
        priority
        fill
      />
      <Icon name={'navigation-add-alt'} classes={[style.icon]} />
      <p className={style.text}>{t('more_games')}</p>
    </Link>
  )
}

export default ThumbnailMore
