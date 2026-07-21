'use server'

import { revalidateTag } from 'next/cache'
import { apiRequest } from '@/app/actions/api'

export async function spinWheelAction(roundId) {
  const res = await apiRequest('wheel/spin/', {
    method: 'POST',
    params: {
      round_id: roundId,
    },
  })

  if (res?.code === '0') {
    revalidateTag('wheels-rounds')
  }

  return res
}
