'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children, initialFavorites }) {
  const [favorites, setFavorites] = useState(initialFavorites?.data || [])
  const [count, setCount] = useState(initialFavorites?.results || 0)

  useEffect(() => {
    setFavorites(initialFavorites?.data || [])
    setCount(initialFavorites?.results || 0)
  }, [initialFavorites])

  const isFavorite = (id) => {
    if (!id) return false
    return favorites.some(favId => String(favId) === String(id))
  }

  const toggleFavorite = (id) => {
    if (!id) return

    const alreadyFavorite = isFavorite(id)
    let updatedFavorites

    if (alreadyFavorite) {
      updatedFavorites = favorites.filter(favId => String(favId) !== String(id))
    } else {
      updatedFavorites = [...favorites, String(id)]
    }

    setFavorites(updatedFavorites)
    setCount(updatedFavorites.length)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, count, setCount, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
