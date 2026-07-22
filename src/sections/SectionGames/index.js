'use client'

import { useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'

import { LIST_COUNT } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'

import Action from '@/components/Action'
import Empty from '@/modules/Empty'
import Back from '@/modules/Back'
import Thumbnail from '@/modules/Thumbnails/Thumbnail'

import style from './index.module.scss'

const SectionGames = ({
  url,
  user,
  data,
  meta,
}) => {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition()
  const [games, setGames] = useState(data)
  const [pagination, setPagination] = useState(meta)

  const handleMore = () => {
    const currentPage = Number(pagination?.page) || 0
    const totalPages = Number(pagination?.pages) || 0
    const nextPage = currentPage + 1

    if (nextPage >= totalPages) return

    startTransition(async () => {
      const res = await apiRequest(url, {
        method: 'POST',
        params: {
          page: nextPage,
          count: LIST_COUNT,
        },
      })

      if (res) {
        const { data: resData, meta: resMeta } = res

        setGames((prev) => [...(prev || []), ...(resData || [])])
        setPagination(resMeta)
      }
    })
  }

  const isData = games?.length > 0
  const isMorePages = (Number(pagination?.page) + 1) < Number(pagination?.pages)
  const active =
    (meta?.category?.id !== '0' && meta?.category?.title) ||
    (meta?.provider?.id !== '0' && meta?.provider?.title)

  return (
    <>
      {
        active &&
        <div className={style.header}>
          <Back />
          <h1>{active}</h1>
        </div>
      }
      {
        isData ?
          <>
            <div className={style.list}>
              {
                games.map((el, idx) =>
                <Thumbnail
                  key={el?.id || idx}
                  data={el}
                  user={user}
                />
              )}
            </div>
            {
              isMorePages &&
              <div className={style.load}>
                <Action
                  placeholder={t('load_more')}
                  classes={['primary', 'lg']}
                  onChange={handleMore}
                  isLoading={isPending}
                />
              </div>
            }
          </>
        :
          <Empty />
      }
    </>
  )
}

export default SectionGames
