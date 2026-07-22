'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useKeenSlider } from 'keen-slider/react'

import { NAVIGATION, ROUTES_USER } from '@/constant/config'
import { useModal } from '@/context/ModalContext'

import Icon from '@/components/Icon'
import CategoryCard from '@/modules/Cards/CategoryCard'
import SearchModal from '@/modules/Modals/SearchModal'

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

  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: false,
    mode: 'free',
    selector: `.${style.slide}`,
    slides: {
      perView: 'auto',
      origin: 'auto',
    },
  })

  if (meta?.results === '0') return null

  return (
    <div className={style.block}>
      <div className={style.slider}>
        <div ref={sliderRef} className="keen-slider">
          <div className={style.slide}>
            <button
              className={style.toggle}
              type="button"
              aria-label={t('search')}
              onClick={() =>
                openModal({
                  title: t('search'),
                  size: 'lg',
                  body: <SearchModal />
                })
              }
            >
              <Icon name="icon-navigation-search" />
              {t('search')}
            </button>
          </div>

          <div className={style.slide}>
            <Link
              href={NAVIGATION.providers.url}
              className={style.toggle}
              type="button"
              aria-label={t('all_providers')}
            >
              <Icon name="icon-games-gambling" />
              {t('all_providers')}
            </Link>
          </div>

          {
            categories?.map((el, idx) =>
            <div
              key={idx}
              className={style.slide}
            >
              <CategoryCard data={el} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SectionCategories
