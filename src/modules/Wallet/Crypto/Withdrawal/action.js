'use server'

import { revalidateTag } from 'next/cache'
import { apiRequest } from '@/app/actions/api'

export async function action(filter) {
  const res = await apiRequest('crypto/withdrawal/', {
    method: 'POST',
    params: { data: filter }
  })

  if (res?.code === '0') {
    revalidateTag('user', 'max')
  }

  return res
}
