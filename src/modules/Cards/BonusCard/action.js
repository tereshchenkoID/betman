'use server'

import { revalidateTag } from 'next/cache'

import { apiRequest } from '@/app/actions/api'

export async function action(id, enable, bonus = null) {
  const params = {
    id,
    enable,
    ...(bonus && { bonus }),
  }

  const res = await apiRequest('bonuses/', {
    method: 'POST',
    params,
  })

  if (res?.code === '0') {
    revalidateTag('bonuses', 'max')
  }

  return res
}
