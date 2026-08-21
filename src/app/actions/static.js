'use server'

import { cache } from 'react'
import { apiRequest } from '@/app/actions/api'

export const getSettings = cache(async () => {
  return apiRequest('settings/', {
    cache: 'force-cache',
    next: {
      revalidate: 3600,
      tags: ['settings']
    },
  });
})

export const getCategories = cache(async () => {
  return apiRequest('categories/', {
    cache: 'force-cache',
    next: {
      revalidate: 3600,
      tags: ['categories']
    },
  });
})

export const getProviders = cache(async () => {
  return apiRequest('providers/', {
    cache: 'force-cache',
    next: {
      revalidate: 3600,
      tags: ['providers']
    },
  });
})

export const getPages = cache(async () => {
  return apiRequest('pages/', {
    cache: 'force-cache',
    next: {
      revalidate: 3600,
      tags: ['pages']
    },
  });
})

export const getBonuses = cache(async () => {
  return apiRequest('counter/', {
    cache: 'force-cache',
    next: { tags: ['bonuses'] },
  });
})

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

export const getCachedUser = cache(async () => {
  return await apiRequest('authSession/', {
    method: 'GET',
    cache: 'no-cache',
  })
})
