'use client'

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'

import { apiRequest } from '@/app/actions/api'
import { useFilterState } from '@/hooks/useFilterState'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Icon from '@/components/Icon'

import Thumbnail from '@/modules/Thumbnails/Thumbnail'
import ProviderCard from '@/modules/Cards/ProviderCard'
import Empty from '@/modules/Empty'
import Tabs from '@/modules/Tabs'

import style from './index.module.scss'

const OPTIONS = [
  { key: 'games', value: 0 },
  { key: 'all_providers', value: 1 },
]

const SECTIONS = {
  0: 'games',
  1: 'providers',
}

const Search = () => {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState(null)
  const [meta, setMeta] = useState(null)
  const [search, setSearch] = useState('')

  const { filter, setFilter } = useFilterState(OPTIONS[0])

  const isSearchValid = useCallback(
    (value) => value?.trim()?.length >= 2,
    []
  )

  const handleSearch = useCallback((q, page = 0) => {
    startTransition(async () => {
      if (page === 0) setData(null)

      const res = await apiRequest('search/', {
        method: 'POST',
        params: {
          q,
          count: 16,
          page,
        },
      })

      if (res) {
        const { data: resData, meta: resMeta } = res

        setData((prev) => {
          if (!prev || page === 0) return resData

          return {
            ...prev,
            games: [...(prev?.games || []), ...(resData?.games || [])],
          }
        })
        setMeta(resMeta)
      }
    })
  }, [])

  useEffect(() => {
    handleSearch('', 0)
  }, [handleSearch])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (isSearchValid(search)) {
      handleSearch(search, 0)
    }
  }

  const handleMore = () => {
    const page = (Number(meta?.page) || 0) + 1
    if (page < Number(meta?.pages)) {
      handleSearch(meta?.q || '', page)
    }
  }

  const handleReset = () => {
    setSearch('')
    handleSearch('', 0)
  }

  const { providers = [], games = [] } = data || {}
  const activeSectionKey = SECTIONS[filter.value]
  const isGamesSection = activeSectionKey === 'games'
  const activeList = isGamesSection ? games : providers
  const isData = activeList?.length > 0
  const isMorePages = (Number(meta?.page) + 1) < Number(meta?.pages)

  return (
    <div className={style.block}>
      <form onSubmit={handleSubmit} className={style.search}>
        <Field
          data={search}
          placeholder={t('search')}
          onChange={setSearch}
        />
        {
          Boolean(meta?.q || search) &&
          <Action
            type="button"
            classes={['secondary', 'md', 'square', style.remove]}
            onChange={handleReset}
          >
            <Icon size="lg" name="icon-navigation-close" />
          </Action>
        }
        <Action
          type="submit"
          classes={['primary', 'square', style.button]}
          isDisabled={!isSearchValid(search)}
        >
          <Icon size="lg" name="icon-navigation-search" />
        </Action>
      </form>
      <Tabs
        options={OPTIONS}
        data={filter}
        action={setFilter}
      />
      {
        isData
          ?
            <>
              <div className={style[isGamesSection ? 'list' : 'grid']}>
                {
                  isGamesSection
                    ?
                      activeList.map((el) =>
                        <Thumbnail
                          key={el?.id || el?.slug}
                          data={el}
                          isEmpty={true}
                        />
                      )
                    :
                      activeList.map((el) =>
                        <ProviderCard
                          key={el?.id || el?.slug}
                          data={el}
                        />
                      )
                }
              </div>
              {
                (isGamesSection && isMorePages) &&
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
            !isPending && meta && <Empty />
      }
    </div>
  )
}

export default Search
