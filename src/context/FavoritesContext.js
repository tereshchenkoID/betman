'use client'

import { useRouter } from 'next/navigation'
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  startTransition,
} from 'react'

import { toast } from '@/utils/toast'
import { consoleHelper } from '@/helpers/console'
import { addFavoritesAction } from '@/app/actions/favorites'

const FavoritesContext = createContext(null)

export const FavoritesProvider = ({
  children,
  user,
  data = [],
  meta: initialMeta,
}) => {
  const router = useRouter()
  const [favorites, setFavorites] = useState(data)
  const [meta, setMeta] = useState(initialMeta)

  useEffect(() => {
    startTransition(() => {
      setFavorites(data)
    })
  }, [data])

  useEffect(() => {
    startTransition(() => {
      setMeta(initialMeta)
    })
  }, [initialMeta])

  const list = useMemo(() => {
    return new Set(favorites.map((item) => String(item.id)))
  }, [favorites])

  const toggleFavorite = useCallback(
    async (game) => {
      if (!user?.id || !game?.id) return

      const gameIdStr = String(game.id)
      const currentlyFavorite = list.has(gameIdStr)

      setFavorites((prev) =>
        currentlyFavorite
          ? prev.filter((item) => String(item.id) !== gameIdStr)
          : [...prev, game]
      )

      setMeta((prev) => {
        if (!prev) return prev
        const count = parseInt(prev.results || '0', 10)
        const newCount = currentlyFavorite ? Math.max(0, count - 1) : count + 1
        return { ...prev, results: String(newCount) }
      })

      const res = await addFavoritesAction(game.id, currentlyFavorite)

      if (res?.code === '0') {
        toast.success(res?.message)

        // startTransition(() => {
        //   router.refresh()
        // })
      } else {
        setFavorites(data)
        setMeta(initialMeta)
        toast.error(res?.error_message || 'Error')
      }
    },
    [user?.id, list, data, initialMeta]
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
