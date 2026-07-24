'use server'

import { revalidateTag } from 'next/cache'
import { apiRequest } from '@/app/actions/api'

export async function addFavoritesAction(id, isFavourite) {
  const res = await apiRequest(`game/${id}/`, {
    method: 'POST',
    params: {
      cmd: isFavourite ? 'remove_from_favorites' : 'add_to_favorites',
    },
  })

  revalidateTag('favorites')

  return res
}
