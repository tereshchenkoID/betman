import { NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'
import { getSettings, getCachedUser } from '@/app/actions/static'

import SectionJackpots from '@/sections/SectionJackpots'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata() {
  return await getPageMetadata('jackpots')
}

export default async function Jackpots({ params }) {
  const [
    metaTags,
    settings,
    user,
    res,
  ] = await Promise.all([
    getPageMetadata('jackpots'),
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
      'target': `${process.env.API_BASE_URL}/${NAVIGATION.home.url}`,
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
