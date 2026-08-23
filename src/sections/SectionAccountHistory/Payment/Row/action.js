'use server'

import { revalidatePath } from 'next/cache'
import { apiRequest } from '@/app/actions/api'

export async function action(id) {
  const res = await apiRequest('deposit-history/cancel/', {
    method: 'POST',
    params: { id },
  })

  if (res?.code === '0') {
    revalidatePath('/account/history/deposit', 'layout')
  }

  return res
}
