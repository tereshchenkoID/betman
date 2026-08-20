'use server'

import { apiRequest } from '@/app/actions/api'

export async function action(code) {
  return await apiRequest('vouchers/redeem/', {
    method: 'POST',
    params: {code}
  })
}
