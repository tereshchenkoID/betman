'use server'

import { revalidateTag } from 'next/cache'
import { apiRequest } from '@/app/actions/api'

export async function action(amount, currency) {
  const res = await apiRequest('crypto/deposit/', {
    method: 'POST',
    params: { amount, currency }
  })

  if (res?.code === '0') {
    revalidateTag('user', 'max')
  }

  return res
}
