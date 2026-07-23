import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/services/metadata'
import { getSettings } from '@/app/actions/static'
import { getCachedUser } from '@/app/actions/auth'
import { apiRequest } from '@/app/actions/api'

import SectionJackpots from '@/sections/SectionJackpots'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('jackpots', locale)
}

export default async function Jackpots({ params }) {
  const { locale } = await params
  const metaTags = await getPageMetadata('jackpots', locale)

  const [
    settings,
    user,
    res,
  ] = await Promise.all([
    getSettings(),
    getCachedUser(),
    apiRequest('jackpots/', {
      method: 'GET'
    })
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': metaTags?.title,
    'url': process.env.BASE_URL,
    'description': metaTags?.description,
    'publisher': {
      '@type': 'Organization',
      'name': process.env.ORGANIZATION_NAME,
      'logo': {
        '@type': 'ImageObject',
        'url': process.env.ORGANIZATION_LOGO
      }
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${process.env.API_BASE_URL}/${NAVIGATION.home.link}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <SectionJackpots
        data={res?.data}
        meta={res?.meta}
        settings={settings}
        user={user}
      />
      <SeoSection alias={'jackpots'} />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
