'use server'

import { apiRequest } from '@/app/actions/api'

export async function action(filter, bonus, isChanged) {
  const payload = {
    ...filter,
    ...(bonus && { bonus }),
    country: filter.country?.value || filter.country || '',
    customer_label: isChanged ? 'untrusted' : filter?.customer_label,
  }

  return await apiRequest('deposit/card-checkout', {
    method: 'POST',
    params: payload,
    isJson: true,
    baseUrl: 'https://matrix.betman.club/api',
  })
}
