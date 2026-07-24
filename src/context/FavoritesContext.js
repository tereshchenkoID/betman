'use client'

import { useTranslations } from 'next-intl'
import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { toast } from '@/utils/toast'
import { consoleHelper } from '@/helpers/console'
import { addFavoritesAction } from '@/app/actions/favorites'

const FavoritesContext = createContext(null)

export const FavoritesProvider = ({
  children,
  user,
  data = [],
  meta,
}) => {
  const t = useTranslations()
  const [favorites, setFavorites] = useState(data)

  const list = useMemo(() => {
    return new Set(favorites.map((item) => String(item.id)))
  }, [favorites])

  const toggleFavorite = useCallback(
    async (game) => {
      if (!user?.id) return

      const isFavorite = list.has(game?.id)

      setFavorites((prev) => {
        if (isFavorite) {
          return prev.filter((item) => String(item.id) !== game?.id)
        } else {
          return [...prev, game]
        }
      })

      const res = await addFavoritesAction(game?.id, isFavorite)

      if (res?.code === '0') {
        setFavorites((prev) => {
          if (isFavorite) {
            return [...prev, game]
          } else {
            return prev.filter((item) => String(item.id) !== game?.id)
          }
        })
        toast.success(res.message)
      }
      else {
        toast.error(res.error_message)
      }
    },[user?.id, list]
  )

  const isFavorite = useCallback(
    (game) => list.has(String(game?.id)),
    [list]
  )

  const value = useMemo(
    () => ({
      favorites,
      meta,
      toggleFavorite,
      isFavorite
    }),
    [favorites, meta, toggleFavorite, isFavorite]
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    consoleHelper.error('Error favorites context')
  }
  return context
}
