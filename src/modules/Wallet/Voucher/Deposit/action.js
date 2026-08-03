'use server'

import { revalidateTag } from 'next/cache'
import { apiRequest } from '@/app/actions/api'

export async function action(code) {
  const res = await apiRequest('vouchers/redeem/', {
    method: 'POST',
    params: { code }
  })

  if (res?.code === '0') {
    revalidateTag('user', 'max')
  }

  return res
}
