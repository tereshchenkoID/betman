'use server'

import { revalidateTag } from 'next/cache'

import { apiRequest } from '@/app/actions/api'

export async function addFavoritesAction(id, isFavourite) {
  const res = await apiRequest(`game/${id}/`, {
    method: 'POST',
    params: {
      cmd: isFavourite ? 'remove' : 'add',
    },
  })

  revalidateTag('favorites', 'max')

  return res
}
