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

  const counter = (res?.data || []).length

  return {
    wheels: res,
    wheelsCounter: counter,
  }
}

export async function getQuests() {
  const res = await apiRequest('quests/', {
    method: 'GET',
    next: { tags: ['quests'] },
  })

  const quests = res?.data || []
  const counter = quests.filter(q => q.status === "0").length

  return {
    quests: res,
    questsCounter: counter,
  }
}
