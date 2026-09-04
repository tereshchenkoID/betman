'use server'

import { apiRequest } from '@/app/actions/api'

export async function action(amount) {
  return await apiRequest('vouchers/create/', {
    method: 'POST',
    params: { amount }
  })
}
