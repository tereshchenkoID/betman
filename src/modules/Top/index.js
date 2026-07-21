import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import style from './index.module.scss'

const Top = ({ size, count }) => {
  const t = useTranslations()

  return (
    <div
      className={
        classNames(
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
