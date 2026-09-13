'use server'

import { apiRequest } from '@/app/actions/api'

export async function action(code) {
  return await apiRequest('promocode/redeem/', {
    method: 'POST',
    params: { code },
  })
}
