import { NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'

import SectionHome from '@/sections/SectionHome'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata() {
  return await getPageMetadata('home')
}

export default async function Home({ params }) {
  const { locale } = await params
  const [
    metaTags,
    skeleton
  ] = await Promise.all([
    getPageMetadata('home'),
    apiRequest('casino/', {
      method: 'GET',
    })
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': metaTags.title,
    'url': process.env.BASE_URL,
    'description': metaTags.description,
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
      <SectionHome
        skeleton={skeleton?.data}
        locale={locale}
      />
      <SeoSection alias={'home'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
