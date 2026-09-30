import { notFound } from 'next/navigation'

import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'

import Section from './_view'

export async function generateMetadata() {
  return await getPageMetadata('payment-callback')
}

export default async function PaymentCallback({ searchParams }) {
  const { order_id } = await searchParams

  const [
    metaTags,
    res,
  ] = await Promise.all([
    getPageMetadata('payment-callback'),
    apiRequest(`payment?order_id=${order_id}`, {
      method: 'GET',
      baseUrl: 'https://matrix.betman.club/api'
    }),
  ])

  if (res?.error) {
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
      'target': `${process.env.BASE_URL}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <Section data={res} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
