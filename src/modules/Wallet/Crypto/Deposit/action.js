'use server'

import { apiRequest } from '@/app/actions/api'

export async function action(amount, currency) {
  return await apiRequest('crypto/deposit/', {
    method: 'POST',
    params: {amount, currency}
  })
}
