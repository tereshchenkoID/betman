'use server'

import { apiRequest } from '@/app/actions/api'

export async function action(filter) {
  return await apiRequest('crypto/withdrawal/', {
    method: 'POST',
    params: {data: filter}
  })
}
