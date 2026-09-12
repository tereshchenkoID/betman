'use server'

import { revalidateTag } from 'next/cache'

import { apiRequest } from '@/app/actions/api'

export async function action(id) {
  const res = await apiRequest('wheel/spin/', {
    method: 'POST',
    params: {
      round_id: id,
    },
  })

  if (res?.code === '0') {
    revalidateTag('wheels-rounds', 'max')
  }

  return res
}
