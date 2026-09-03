'use server'

import { apiRequest } from '@/app/actions/api'

export async function action(amount, currency, bonus = null) {
  const params = {
    amount,
    currency,
    ...(bonus && { bonus }),
  }

  return await apiRequest('crypto/deposit/', {
    method: 'POST',
    params
  })
}
