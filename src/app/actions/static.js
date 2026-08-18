'use server'

import { cache } from 'react'
import { apiRequest } from '@/app/actions/api'

export async function getSettings() {
  return apiRequest('settings/', {
    cache: 'force-cache',
    next: { tags: ['settings'] },
  });
}

export async function getCategories() {
  return apiRequest('categories/', {
    cache: 'force-cache',
    next: { tags: ['categories'] },
  });
}

export async function getProviders() {
  return apiRequest('providers/', {
    cache: 'force-cache',
    next: { tags: ['providers'] },
  });
}

export async function getPages() {
  return apiRequest('pages/', {
    cache: 'force-cache',
    next: { tags: ['pages'] },
  });
}

export async function getBonuses() {
  return apiRequest('counter/', {
    cache: 'force-cache',
    next: { tags: ['bonuses'] },
  });
}

export const getWheelsRound = cache(async () => {
  const res = await apiRequest('wheel/rounds/', {
    next: { tags: ['wheels-rounds'] },
  })

  const counter = (res?.data || []).length

  return {
    wheels: res,
    wheelsCounter: counter,
    timer: res?.timer,
    message: res?.message,
  }
})

export const getQuests = cache(async () => {
  const res = await apiRequest('quests/', {
    next: { tags: ['quests'] },
  })

  const quests = res?.data || []
  const counter = quests.filter(q => q.status === "0").length

  return {
    quests: res,
    questsCounter: counter,
  }
})

export const getFavorites = cache(async () => {
  return await apiRequest('favorites/', {
    cache: 'no-cache',
    next: { tags: ['favorites'] },
  })
})
