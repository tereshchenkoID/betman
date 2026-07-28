'use server'

import { apiRequest } from '@/app/actions/api'

export async function action() {
  return await apiRequest('countries/', {
    method: 'GET',
    next: { tags: ['countries'] },
  })
}
