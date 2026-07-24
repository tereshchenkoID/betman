// app/sitemap.js

import { routing } from '@/i18n/routing'

export default async function sitemap() {
  const baseUrl = process.env.BASE_URL
  const locales = routing.locales
  const pages = [
    '',
    '/about',
    '/games'
  ]

  const routes = []

  locales.forEach((locale) => {
    pages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: page === '' ? 1 : 0.8,
      })
    })
  })

  return routes
}
