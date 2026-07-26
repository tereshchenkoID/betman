'use server'

import { revalidateTag } from 'next/cache'
import { apiRequest } from '@/app/actions/api'

export async function action(id, enable) {
  const res = await apiRequest('bonuses/', {
    method: 'POST',
    params: {
      id,
      enable
    },
  })

  if (res?.code === '0') {
    revalidateTag('bonuses')
  }

  return res
}
