import { useTranslations } from 'next-intl'

import clsx from 'clsx'

import style from './index.module.scss'

const Top = ({ size, count }) => {
  const t = useTranslations()

  return (
    <div
      className={
        clsx(
          style.block,
          style[size]
        )
      }
    >
      <strong>{t('top')} {count}</strong>
    </div>
  )
}

export default Top
