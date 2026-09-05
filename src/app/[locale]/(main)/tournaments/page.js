import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/app/actions/metadata'

import SeoSection from '@/sections/SectionSeo'
import SectionTournaments from '@/sections/SectionTournaments'

export async function generateMetadata() {
  return await getPageMetadata('tournaments')
}

export default async function Tournaments() {
  const metaTags = await getPageMetadata('tournaments')

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
      'target': `${process.env.BASE_URL}/${NAVIGATION.home.url}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <SectionTournaments />
      <SeoSection alias={'tournaments'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
