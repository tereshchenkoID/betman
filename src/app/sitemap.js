import { routing } from '@/i18n/routing'

export const revalidate = 86400

export default async function sitemap() {
  const baseUrl = process.env.BASE_URL
  const locales = routing.locales

  const staticPages = [
    '',
    '/casino',
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
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      })
    })
  })

  return routes
}
