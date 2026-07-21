'use server'

import { apiRequest } from '@/app/actions/api'

export async function getSettings() {
  return apiRequest('settings/', {
    cache: 'force-cache',
    next: { tags: ['settings'] } // next: { revalidate: 3600 }
  });
}

export async function getCategories() {
  return apiRequest('categories/', {
    cache: 'force-cache',
    next: { tags: ['categories'] }
  });
}

export async function getProviders() {
  return apiRequest('providers/', {
    cache: 'force-cache',
    next: { tags: ['providers'] }
  });
}

export async function getPages() {
  return apiRequest('pages/', {
    cache: 'force-cache',
    next: { tags: ['pages'] }
  });
}

export async function getWheelsRound() {
  const res = await apiRequest('wheel/rounds/', {
    method: 'GET',
    next: { tags: ['wheels-rounds'] },
  })

  const rounds = res?.data || []

  console.log(rounds)

  return {
    wheels: res,
    wheelsCounter: rounds.length,
  }
}
