'use client'

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react'

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
  const [favorites, setFavorites] = useState(data)
  const list = useMemo(() => {
    return new Set(favorites.map((item) => String(item.id)))
  }, [favorites])

  const toggleFavorite = useCallback(
    async (game) => {
      if (!user?.id || !game?.id) return

      const gameIdStr = String(game.id)
      const currentlyFavorite = list.has(gameIdStr)

      setFavorites((prev) => {
        if (currentlyFavorite) {
          return prev.filter((item) => String(item.id) !== gameIdStr)
        } else {
          return [...prev, game]
        }
      })

      const res = await addFavoritesAction(game.id, currentlyFavorite)

      if (res?.code === '0') {
        toast.success(res.message)
      } else {
        setFavorites((prev) => {
          if (currentlyFavorite) {
            return [...prev, game]
          } else {
            return prev.filter((item) => String(item.id) !== gameIdStr)
          }
        })
        toast.error(res?.error_message || 'Error')
      }
    },
    [user?.id, list]
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
      isFavorite,
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
