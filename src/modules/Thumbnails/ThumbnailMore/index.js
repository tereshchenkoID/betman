import Link from 'next/link'
import { useTranslations } from 'next-intl'

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
    >
      <p className={style.text}>{t('more_games')}</p>
    </Link>
  )
}

export default ThumbnailMore
