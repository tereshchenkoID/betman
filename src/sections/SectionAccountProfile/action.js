'use server'

import { revalidateTag } from 'next/cache'
import { apiRequest } from '@/app/actions/api'

export async function action(params) {
  const res = await apiRequest('profile/', {
    method: 'POST',
    params,
  })

  if (res?.code === '0') {
    revalidateTag('profile')
  }

  return res
}
