'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

import { NAVIGATION, ROUTES_USER } from '@/constant/config'
import { useModal } from '@/context/ModalContext'

import Icon from '@/components/Icon'
import Slider from '@/modules/Slider'
import CategoryCard from '@/modules/Cards/CategoryCard'

import style from './index.module.scss'

const SectionCategories = ({
  data,
  meta,
  user,
}) => {
  const t = useTranslations()
  const { openModal } = useModal()

  const categories = [
    ...(user?.id ? [{
      id: '0',
      title: t(ROUTES_USER.favourites.text),
      slug: 'favourites',
      link: ROUTES_USER.favourites.url,
      icon: ROUTES_USER.favourites.icon
    }] : []),
    ...data || []
  ]

  if (meta?.results === '0') return null

  return (
    <Slider
      className={style.block}
      navigation={{
        isVisible: false,
      }}
    >
      <button
        type="button"
        className={style.toggle}
        aria-label={t('search')}
        onClick={() => openModal('search', { user }, { title: t('search'), size: 'lg' })}
      >
        <Icon name="icon-navigation-search" />
        {t('search')}
      </button>

      <Link
        href={NAVIGATION.providers.url}
        className={style.toggle}
        aria-label={t('all_providers')}
      >
        <Icon name="icon-games-gambling" />
        {t('all_providers')}
      </Link>

      {
        categories.map((el, idx) =>
        <CategoryCard key={idx} data={el} />
      )}
    </Slider>
  )
}

export default SectionCategories
