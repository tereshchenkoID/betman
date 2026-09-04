'use client'

import { useFavorites } from '@/context/FavoritesContext'

import Thumbnail from '@/modules/Cards/Thumbnail'
import Empty from '@/modules/Empty'

import style from './index.module.scss'

const SectionAccountFavorites = ({ user }) => {
  const { favorites, meta } = useFavorites()

  return (
    <section>
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
