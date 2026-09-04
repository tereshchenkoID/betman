import { notFound } from 'next/navigation'

import { NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'

import SectionPromo from '@/sections/SectionPromo'

export async function generateMetadata() {
  return await getPageMetadata('promo')
}

export default async function Promo({ params }) {
  const { id } = await params

  const [
    metaTags,
    res,
  ] = await Promise.all([
    getPageMetadata('promo'),
    apiRequest(`promo/${id}`, {
      method: 'GET',
    }),
  ])

  if (res?.meta?.results === '0') {
    notFound()
  }

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
      <SectionPromo
        data={res?.data}
        meta={res?.meta}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
