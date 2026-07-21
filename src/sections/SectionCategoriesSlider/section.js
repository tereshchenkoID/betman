'use client'

import { useTranslations } from 'next-intl'

import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ROUTES_USER } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import Icon from '@/components/Icon'
import CategoryCard from '@/modules/Cards/CategoryCard'
import ProvidersModal from '@/modules/Modals/ProvidersModal'
import SearchModal from '@/modules/Modals/SearchModal'

import style from './index.module.scss'

const Section = ({
  data,
  meta,
  user,
  providers,
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
    <div className={style.block}>
      <div className={style.slider}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={8}
          modules={[FreeMode]}
        >
          <SwiperSlide>
            <button
              className={style.toggle}
              type={'button'}
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
          </SwiperSlide>
          <SwiperSlide>
            <button
              className={style.toggle}
              type={'button'}
              aria-label={t('all_providers')}
              onClick={() =>
                openModal({
                  title: t('all_providers'),
                  body: <ProvidersModal providers={providers} />,
                  size: 'md',
                })
              }
            >
              <Icon name="icon-games-gambling" />
              {t('all_providers')}
            </button>
          </SwiperSlide>
          {
            categories?.map((el, idx) =>
              <SwiperSlide key={idx}>
                <CategoryCard data={el} />
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>
    </div>
  )
}

export default Section
