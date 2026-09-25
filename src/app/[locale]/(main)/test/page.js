import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'

import IframeBreaker from '@/modules/IframeBreaker'

export async function generateMetadata() {
  return await getPageMetadata('Test')
}

export default async function Test({ searchParams }) {
  const { order_id } = await searchParams

  const [
    metaTags,
    res,
  ] = await Promise.all([
    getPageMetadata('Test'),
    apiRequest(`payment?order_id=${order_id}`, {
      method: 'GET',
      baseUrl: 'https://matrix.betman.club/api'
    }),
  ])

  console.log(res)

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
      <IframeBreaker />
      <pre>{JSON.stringify(res, null, 2)}</pre>
      {order_id}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
