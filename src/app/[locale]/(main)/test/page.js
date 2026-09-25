import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'

export async function generateMetadata() {
  return await getPageMetadata('tournaments')
}

export default async function Test() {
  const [
    metaTags,
    res,
  ] = await Promise.all([
    getPageMetadata('tournaments'),
    apiRequest('/payment?order_id=card_20260925183626_bf8b0eda6c', {
      method: 'GET',
      baseUrl: 'https://matrix.betman.club/api'
    }),
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
      'target': `${process.env.BASE_URL}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <pre>{JSON.stringify(res)}</pre>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
