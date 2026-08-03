'use server'

import { revalidateTag } from 'next/cache'
import { apiRequest } from '@/app/actions/api'

export async function action(amount) {
  const res = await apiRequest('vouchers/create/', {
    method: 'POST',
    params: { amount }
  })

  if (res?.code === '0') {
    revalidateTag('user', 'max')
  }

  return res
}
