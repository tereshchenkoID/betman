import { apiRequest } from '@/app/actions/api'

import { routing } from '@/i18n/routing'
import { consoleHelper } from '@/helpers/console'

export const revalidate = 86400

const sanitizeUrl = (url) => {
  return url.replace(/&/g, '&amp;')
}

export default async function sitemap() {
  const baseUrl = process.env.BASE_URL
  const locales = routing.locales || ['en', 'uk']

  const staticPages = [
    '',
    '/games',
    '/info',
    '/jackpots',
    '/promotions',
    '/providers',
    '/quests',
    '/registration',
    '/tournaments',
    '/wheel-of-fortune',
  ]

  const routes = []

  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      routes.push({
        url: sanitizeUrl(`${baseUrl}/${locale}${page}`),
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      })
    })
  })

  try {
    const response = await apiRequest('games/list/', { method: 'GET' })
    const games = response?.data || []

    locales.forEach((locale) => {
      games.forEach((game) => {
        routes.push({
          url: sanitizeUrl(`${baseUrl}/${locale}/${game.slug}`),
          lastModified: new Date(game.updatedAt || Date.now()),
          changeFrequency: 'weekly',
          priority: 0.7,
        })
      })
    })
  } catch (error) {
    consoleHelper.error(error)
  }

  return routes
}
