'use server'

import { apiRequest } from '@/app/actions/api'

export async function action(filter) {
  return await apiRequest('cards/withdrawal/', {
    method: 'POST',
    params: { data: filter }
  })
}
