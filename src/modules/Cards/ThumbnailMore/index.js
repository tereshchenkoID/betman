import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const ThumbnailMore = ({ url }) => {
  const t = useTranslations()

  return (
    <Link
      href={url}
      className={style.block}
      style={{
        backgroundImage: 'url(/images/thumbnail_more_games_2x3.webp)',
      }}
      aria-label={t('more_games')}
      prefetch={false}
    >
      <Icon name={'navigation-add-alt'} />
      <p>{t('more_games')}</p>
    </Link>
  )
}

export default ThumbnailMore
