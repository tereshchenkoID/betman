'use client'

import { useTranslations } from 'next-intl'

import { useFavorites } from '@/context/FavoritesContext'

import Thumbnail from '@/modules/Cards/Thumbnail'
import Empty from '@/modules/Empty'
import Title from '@/modules/Title'

import style from './index.module.scss'

const SectionAccountFavorites = ({ user }) => {
  const t = useTranslations()
  const { favorites, meta } = useFavorites()

  return (
    <section>
      <Title
        isBack={true}
        title={t('categories.favorites')}
      />
      {
        meta?.results !== '0'
          ?
            <div className={style.list}>
              {
                favorites?.map((el, idx) =>
                  <Thumbnail
                    key={el?.id || idx}
                    data={el}
                    user={user}
                  />
                )
              }
            </div>
          :
            <Empty />
      }
    </section>
  )
}

export default SectionAccountFavorites
