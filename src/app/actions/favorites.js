'use server'

import { apiRequest } from '@/app/actions/api'
import { revalidatePath } from 'next/cache'

/**
 * Fetches the current user's favorites from the backend using the universal apiRequest.
 * @returns {Promise<Object>} Object with results count and array of IDs, or error indicator.
 */
export async function getFavoritesAction() {
  try {
    return await apiRequest('user/favorites/')
  } catch (error) {
    console.error('Favorites Action Error:', error)
    return null
  }
}

/**
 * Gets full data with pagination for the profile page (POST)
 * @param {Object} params - Filter parameters
 * @param {number} params.page - Current page
 * @param {number} params.sort - Sort type
 */
export async function getFavoritesListAction({ page = 1, sort = 0 } = {}) {
  try {
    return await apiRequest('user/favorites/', {
      method: 'POST',
      params: {
        sort: Number(sort),
        page: Number(page),
      }
    })
  } catch (error) {
    console.error('Get Favorites List Action Error:', error)
    return null
  }
}

/**
 * Add / Delete from favorites
 * @param {string|number} carId - Cars id
 * @param {boolean} isFavorite - Is in the chosen one
 */
export async function setFavoriteAction(carId, isFavorite) {
  try {
    const actionType = isFavorite ? 1 : 0

    const response = await apiRequest('user/favorites/action/', {
      method: 'POST',
      params: {
        id: carId.toString(),
        type: actionType
      }
    })

    revalidatePath('user/favorites/')

    return response
  } catch (error) {
    console.error('Favorites Toggle Action Error:', error)
    return error
  }
}
