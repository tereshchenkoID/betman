'use client'

import { useFavorites } from '@/context/FavoritesContext'

import Empty from '@/modules/Empty'
import Thumbnail from '@/modules/Thumbnails/Thumbnail'

import style from './index.module.scss'

const SectionAccountFavorites = ({ user  }) => {
  const { favorites } = useFavorites()

  console.log(favorites)

  return (
    <section>
      {
        favorites?.length > 0
          ?
            <div className={style.list}>
              {
                favorites?.map((el, idx) =>
                  <Thumbnail
                    key={idx}
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
