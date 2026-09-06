'use client'

import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import Icon from '@/components/Icon'
import CategoryCard from '@/modules/Cards/CategoryCard'
import Slider from '@/modules/Slider'

import style from './index.module.scss'

const SectionCategories = ({
  data,
  meta,
  user,
}) => {
  const t = useTranslations()
  const { openModal } = useModal()

  if (meta?.results === '0') return null

  return (
    <Slider
      className={style.block}
      navigation={{
        isVisible: true,
        position: 'right',
        size: 'md'
      }}
    >
      <button
        type="button"
        className={style.toggle}
        aria-label={t('search')}
        onClick={() => openModal('search', { user }, { title: t('search'), size: 'lg' })}
      >
        <Icon name="navigation-search" />
        {t('search')}
      </button>
      <Link
        href={NAVIGATION.providers.url}
        className={style.toggle}
        aria-label={t('all_providers')}
      >
        <Icon name="games-gambling" />
        {t('all_providers')}
      </Link>
      {
        data.map((el, idx) =>
        <CategoryCard
          key={el?.id || idx}
          data={el}
        />
      )}
    </Slider>
  )
}

export default SectionCategories
