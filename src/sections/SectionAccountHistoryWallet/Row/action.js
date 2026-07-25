'use server'

import { apiRequest } from '@/app/actions/api'
import { revalidatePath } from 'next/cache'

export async function cancelTransactionAction(id) {
  const formData = new FormData()
  formData.append('id', id)

  const res = await apiRequest('wallet-history/cancel/', {
    method: 'POST',
    body: formData,
  })

  if (res?.code === '0') {
    revalidatePath('/account/history/wallet', 'layout')
    // revalidatePath('/account/history/wallet')
  }

  return res
}
